const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
// Models
const Item = require('../../models/Item');

/* 

Item routes 
------------

All routes associated with items and item CRUD operations

Create an item : POST /api/items/:groupId : private 
Update item info : PUT /api/items/ : private 
Delete item account : DELETE /api/items/ : private 

*/

// Create a new item
// POST /api/items/:groupId
// private
router.post('/:groupId', auth, (req, res) => {
  // input validation
  // create new item with groupId
  // save item
  // return item and success alert
});

// Update item info
// PUT /api/items/:id
// private
router.put('/:id', auth, (req, res) => {
  // input validation
  // find item with req.params.id
  // update item fields
  // save item
  // return success alert
});

// Delete item
// DELETE /api/items/:id
// private
router.delete('/:id', auth, (req, res) => {
  // find item with req.params.id
  // delete item
  // return success alert
});

module.exports = router;
