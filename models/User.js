const mongoose = require('mongoose');

/*

Schema declaration for User collections 

Users consists of 
 - name : string , required 
 - email : string , required , unique
 - password : string , required (hash using bcryptjs)
 - date : date , default date.now

Documents stored in "users" collection

*/

// User collection schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('User', UserSchema);
