const mongoose = require('mongoose');

/*

Schema declaration for Item collections 

Items consists of 
 - name : string , required 
 - user : ref to users 
 - list : ref to lists
 - priotity : number , required
 - completed : boolean , default false 
 - date : date , default date.now

Documents stored in "items" collection

*/

// Item collection schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lists',
  },
  priority: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model('Item', ItemSchema);
