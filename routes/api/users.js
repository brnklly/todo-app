const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
// Models
const User = require('../../models/User');
const List = require('../../models/List');
const Item = require('../../models/Item');

/* 

User routes 
------------

All routes associated with users and user CRUD operations

Register user : POST /api/users/register : public 
Login user : POST /api/users/login : public 

Update user info : PUT /api/users/ : private 
Delete user account : DELETE /api/users/ : private 

*/

// Register a new user
// POST /api/users/register
// public
router.post('/register', (req, res) => {
  // input validation
  // check if user exists by email
  // create new user and encrypt password using bcryptjs
  // return success alert
});

// Login a user
// POST /api/users/login
// public
router.post('/login', (req, res) => {
  // input validation
  // find user from email
  // compare passwords using bcryptjs
  // return jwt
});

// Update user info (requires password)
// PUT /api/users/
// private
router.put('/', auth, (req, res) => {
  // input validation
  // find user with req.user.id
  // compare passwords using bcryptjs
  // if email changed, check for existing email
  // update user fields
  // save user
  // return success alert
});

// Delete user account (requires password)
// DELETE /api/users/
// private
router.delete('/', auth, (req, res) => {
  // input validation
  // find user with req.user.id
  // compare passwords using bcryptjs
  // delete user
  // delete all lists with user.id
  // delete all items with user.id
  // return success alert
});

module.exports = router;
