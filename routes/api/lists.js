const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
// Models
const User = require('../../models/User');
const List = require('../../models/List');
const Item = require('../../models/Item');

/* 

List routes 
------------

All routes associated with lists and list CRUD operations

Create a list : POST /api/lists/ : private 
Get a list with items : GET /api/lists/:id : private 
Get user's lists : GET /api/lists/ : private 
Update list info : PUT /api/lists/ : private 
Delete list account : DELETE /api/lists/ : private 

*** All errors and alerts are sent: 
{ 
  alerts: [
    {
      msg: 'alert/error message',
      alertType: 'fail'
    },
  ]
}

*/

// Create a new list
// POST /api/lists/
// private
router.post(
  '/',
  [
    auth,
    check('name', 'List name is required.').trim().escape().not().isEmpty(),
  ],
  async (req, res) => {
    // input validation
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      // add an alertType of 'fail' to each error for frontend
      errors = errors.array();
      errors.forEach((error) => (error.alertType = 'fail'));
      // return error alert with form errors
      return res.status(400).json({ alerts: errors });
    }

    // deconstruct req body
    const { name } = req.body;

    try {
      // find current user
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({
          alerts: [
            {
              msg: 'Unauthorized. Please log in to create a list.',
              alertType: 'fail',
            },
          ],
        });
      }
      // create new list
      const list = new List({ name, user });
      // save list
      await list.save();
      // return list and success alert
      res.json(list);
    } catch (error) {
      console.log(error.message);
      // send server failure alert to client
      res.status(500).json({
        alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
      });
    }
  }
);

// Get a list with items
// GET /api/lists/:id
// private
router.get('/:id', auth, async (req, res) => {
  try {
    // find list with :id and req.user.id
    let list = await List.findOne({ _id: req.params.id, user: req.user.id });
    // if list does not exist, return error alert
    if (!list) {
      return res.status(400).json({
        alerts: [{ msg: 'The list does not exist.', alertType: 'fail' }],
      });
    }
    // find all items assoc with list
    let items = await Item.find({ list });

    // sort based on priority
    if (list.prioritize) {
      const sortOrder = ['low', 'med', 'high'];
      items = items.sort((a, b) => {
        return sortOrder.indexOf(b.priority) - sortOrder.indexOf(a.priority);
      });
    }
    if (list.moveCompleted) {
      // move completed to bottom
      items = items.sort((a, b) => a.completed - b.completed);
    }

    // add items to list as array
    list = {
      ...list._doc,
      items,
    };
    // return list
    res.json(list);
  } catch (error) {
    console.log(error.message);
    // send server failure alert to client
    res.status(500).json({
      alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
    });
  }
});

// Get all lists of current user
// GET /api/lists/
// private
router.get('/', auth, async (req, res) => {
  try {
    // find all lists with :id and req.user.id
    const lists = await List.find({ user: req.user.id });
    // return lists
    res.json(lists);
  } catch (error) {
    console.log(error.message);
    // send server failure alert to client
    res.status(500).json({
      alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
    });
  }
});

// Update list name
// PUT /api/lists/:id
// private
router.put(
  '/:id',
  [
    auth,
    check('name', 'List name is required').trim().not().isEmpty(),
    check(
      'moveCompleted',
      'Stop trying to hack this site, please.'
    ).isBoolean(),
    check('prioritize', 'Stop trying to hack this site, please.').isBoolean(),
  ],
  async (req, res) => {
    // input validation
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      // add an alertType of 'fail' to each error for frontend
      errors = errors.array();
      errors.forEach((error) => (error.alertType = 'fail'));
      // return error alert with form errors
      return res.status(400).json({ alerts: errors });
    }

    // deconstruct req body
    const { name, moveCompleted, prioritize } = req.body;

    try {
      // find list with req.params.id
      let list = await List.findOne({ _id: req.params.id, user: req.user.id });
      // if list does not exist, return error alert
      if (!list) {
        return res.status(400).json({
          alerts: [{ msg: 'The list does not exist.', alertType: 'fail' }],
        });
      }

      // update list fields
      list.name = name;
      list.moveCompleted = moveCompleted;
      list.prioritize = prioritize;
      // save list
      await list.save();

      // find all items assoc with list
      const items = await Item.find({ list });
      // add items to list as array
      list = {
        ...list._doc,
        items,
      };

      // return success alert
      res.json(list);
    } catch (error) {
      console.log(error.message);
      // send server failure alert to client
      res.status(500).json({
        alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
      });
    }
  }
);

// Delete list
// DELETE /api/lists/:id
// private
router.delete('/:id', auth, async (req, res) => {
  try {
    // find list with req.params.id
    const list = await List.findOne({ _id: req.params.id, user: req.user.id });
    // if list does not exist, return error alert
    if (!list) {
      return res.status(400).json({
        alerts: [{ msg: 'The list does not exist.', alertType: 'fail' }],
      });
    }
    // delete list
    await list.remove();
    // delete all items with list.id
    await Item.deleteMany({ list });
    // return success alert
    res.json({
      alerts: [{ msg: 'List deleted.', alertType: 'success', expires: true }],
    });
  } catch (error) {
    console.log(error.message);
    // send server failure alert to client
    res.status(500).json({
      alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
    });
  }
});

module.exports = router;
