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

// Register a new user
// POST /api/users/register
// public
router.post(
  '/register',
  [
    check('name', 'Name is required.').trim().escape().not().isEmpty(),
    check('email', 'Valid email is required.').isEmail(),
    check('password', 'Password must be 6 characters minimum').isLength({
      min: 6,
    }),
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
    const { name, email, password } = req.body;

    try {
      // check if user exists by email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // return alert that user exists
        return res.status(400).json({
          alerts: [
            {
              msg: 'Email is already in use. Please log in.',
              alertType: 'fail',
            },
          ],
        });
      }

      // create new user and encrypt password using bcryptjs
      let user = new User({
        name,
        email,
        password,
      });
      // encrypt password
      user.password = await bcrypt.hash(password, 10);
      // save user
      await user.save();

      // return success alert
      return res.json({
        alerts: [
          {
            msg: `Welcome to TodoApp, ${user.name}. Please log in.`,
            alertType: 'success',
          },
        ],
      });
    } catch (error) {
      console.log(error.message);
      // send server failure alert to client
      res.status(500).json({
        alerts: [{ msg: 'Server error. Please try again.', alertType: 'fail' }],
      });
    }
  }
);

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
