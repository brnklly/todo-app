const mongoose = require('mongoose');

/*

Schema declaration for List collections 

Lists consists of 
 - name : string , required 
 - user : ref to users 
 - moveCompleted : boolean , default false 
 - prioritze : boolean , default false 
 - date : date , default date.now

Documents stored in "lists" collection

*/

// List collection schema
const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  moveCompleted: {
    type: Boolean,
    default: false,
  },
  prioritize: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = List = mongoose.model('List', ListSchema);
