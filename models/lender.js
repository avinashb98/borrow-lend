const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Lender Schema
const LenderSchema = new Schema({
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
  }
});

const Lender = mongoose.model('lender', LenderSchema);

module.exports = Lender;
