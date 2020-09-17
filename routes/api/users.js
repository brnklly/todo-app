const express = require('express');
const router = express.Router();
const config = require('config');
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
router.post(
  '/login',
  [
    check('email', 'Email is required.').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
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
    const { email, password } = req.body;

    try {
      // find user from email
      const user = await User.findOne({ email });
      if (!user) {
        // return invalid credentials alert (user does not exist)
        return res.status(400).json({
          alerts: [
            {
              msg: 'Invalid credentials. Enter a valid email and password.',
              alertType: 'fail',
            },
          ],
        });
      }
      // compare passwords using bcryptjs
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // return invalid credentials alert (password is incorrect)
        return res.status(400).json({
          alerts: [
            {
              msg: 'Invalid credentials. Enter a valid email and password.',
              alertType: 'fail',
            },
          ],
        });
      }

      // create and return jwt with user id in payload
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(payload, config.get('secret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
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

// Update user info (requires password)
// PUT /api/users/
// private
router.put(
  '/',
  [
    auth,
    check('name', 'Name is required').trim().escape().not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Please enter your password').not().isEmpty(),
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
      // find user with req.user.id
      let user = await User.findById(req.user.id);
      // compare passwords using bcryptjs
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // return invalid credentials alert (password is incorrect)
        return res.status(400).json({
          alerts: [
            {
              msg: 'Invalid password. Please enter your password.',
              alertType: 'fail',
            },
          ],
        });
      }
      // if email changed, check for existing email
      if (user.email !== email) {
        const existingUser = await User.find({
          email,
          _id: { $ne: user.id },
        });
        // if email exists, return error alert
        if (existingUser.length > 0) {
          return res.status(400).json({
            alerts: [{ msg: 'Email already in use.', alertType: 'fail' }],
          });
        }
        // update user email
        user.email = email;
      }
      // update user name
      user.name = name;
      // save user
      await user.save();
      // return success alert
      res.json({
        alerts: [{ msg: 'User updated.', alertType: 'success' }],
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
