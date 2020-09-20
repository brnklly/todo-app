const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
// Models
const List = require('../../models/List');
const Item = require('../../models/Item');

/* 

Item routes 
------------

All routes associated with items and item CRUD operations

Create an item : POST /api/items/:groupId : private 
Update item info : PUT /api/items/ : private 
Delete item account : DELETE /api/items/ : private 

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

// Create a new item
// POST /api/items/list/:listId
// private
router.post(
  '/list/:listId',
  [
    auth,
    check('name', 'Item name is required.').trim().not().isEmpty(),
    check('priority', 'Please select a priority level.').isIn([
      'high',
      'med',
      'low',
    ]),
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
    const { name, priority } = req.body;

    try {
      // find list
      const list = await List.findOne({
        _id: req.params.listId,
        user: req.user.id,
      });
      // if list does not exist, return error alert
      if (!list) {
        return res.status(400).json({
          alerts: [{ msg: 'The list does not exist.', alertType: 'fail' }],
        });
      }
      // create new item with listId and user
      const item = new Item({
        name,
        priority,
        list,
        user: req.user.id,
      });
      // save item
      await item.save();
      // return item and success alert
      res.json(item);
    } catch (error) {
      console.log(error.message);
      // send server failure alert to client
      res.status(500).json({
        alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
      });
    }
  }
);

// Update item info
// PUT /api/items/:id
// private
router.put(
  '/:id',
  [
    auth,
    check('name', 'Item name is required').trim().not().isEmpty(),
    check('completed', 'Stop trying to hack this site, please.').isBoolean(),
    check('priority', 'Please select a priority level.').isIn([
      'high',
      'med',
      'low',
    ]),
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
    const { name, priority, completed } = req.body;

    try {
      // find item with req.params.id
      let item = await Item.findOne({ _id: req.params.id, user: req.user.id });
      // if item does not exist, return error alert
      if (!item) {
        return res.status(400).json({
          alerts: [{ msg: 'The item does not exist.', alertType: 'fail' }],
        });
      }
      // update item fields
      item.name = name;
      item.completed = completed;
      item.priority = priority;
      // save item
      await item.save();
      // return success alert
      // return success alert
      res.json(item);
    } catch (error) {
      console.log(error.message);
      // send server failure alert to client
      res.status(500).json({
        alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
      });
    }
  }
);

// Delete item
// DELETE /api/items/:id
// private
router.delete('/:id', auth, async (req, res) => {
  try {
    // find item with req.params.id
    const item = await Item.findOne({ _id: req.params.id, user: req.user.id });
    // if item does not exist, return error alert
    if (!item) {
      return res.status(400).json({
        alerts: [{ msg: 'The item does not exist.', alertType: 'fail' }],
      });
    }
    // delete item
    await item.remove();
    // return success alert
    res.json({ alerts: [{ msg: 'Item deleted.', alertType: 'success' }] });
  } catch (error) {
    console.log(error.message);
    // send server failure alert to client
    res.status(500).json({
      alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
    });
  }
});

module.exports = router;
