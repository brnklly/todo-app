const jwt = require('jsonwebtoken');
const config = require('config');

// Authentication middleware
// checks for token in headers and
// sets req.user to user based on id in payload

module.exports = function async(req, res, next) {
  // get jsonwebtoken from headers
  const token = req.header('x-auth-token');
  // check for token
  if (!token) {
    return res.status(401).json({
      alerts: [
        {
          msg: 'Unauthorized. Please log in.',
          alertType: 'fail',
        },
      ],
    });
  }
  try {
    // verify token is valid
    const decoded = jwt.verify(token, config.get('secret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      alerts: [
        {
          msg: 'Unauthorized. Please log in.',
          alertType: 'fail',
        },
      ],
    });
  }
};
