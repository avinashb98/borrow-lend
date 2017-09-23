const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Borrower Schema
const BorrowerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  email: {
    type: String,
    required: [true, 'Email required']
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  creditLimit: {
    type: Number,
    default: 100000
  }
});

const Borrower = mongoose.model('borrower', BorrowerSchema);

module.exports = Borrower;
