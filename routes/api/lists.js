const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

/* 

List routes 
------------

All routes associated with lists and list CRUD operations

Create a list : POST /api/lists/ : private 
Get a list with items : GET /api/lists/:id : private 
Get user's lists : GET /api/lists/ : private 
Update list info : PUT /api/lists/ : private 
Delete list account : DELETE /api/lists/ : private 

*/

// Create a new list
// POST /api/lists/
// private
router.post('/', auth, (req, res) => {
  // input validation
  // create new list
  // save list
  // return list and success alert
});

// Get a list with items
// GET /api/lists/:id
// private
router.get('/:id', auth, (req, res) => {
  // find list with :id and req.user.id
  // find all items assoc with list
  // add items to list as array
  // return list
});

// Get all lists of current user
// GET /api/lists/
// private
router.get('/', auth, (req, res) => {
  // find all lists with :id and req.user.id
  // return lists
});

// Update list info
// PUT /api/lists/:id
// private
router.put('/:id', auth, (req, res) => {
  // input validation
  // find list with req.params.id
  // update list fields
  // save list
  // return success alert
});

// Delete list
// DELETE /api/lists/:id
// private
router.delete('/:id', auth, (req, res) => {
  // input validation
  // find list with req.params.id
  // delete list
  // delete all items with list.id
  // return success alert
});

module.exports = router;
