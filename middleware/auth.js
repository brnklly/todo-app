// Authentication middleware

module.exports = function (req, res, next) {
  // authentication placeholder function
  // will be moved to middleware folder...
  // once login route is completed

  // checks for token in headers and
  // sets req.user to user based on id in payload
  console.log('authenticating...');
  next();
};
