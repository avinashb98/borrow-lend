const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Credit Request Schema
const CreditRequestSchema = new Schema({
  amount: {
    type: Number,
    required: [true, 'Amount Required']
  },
  borrower: {
    type: String
  },
  dueDate: {
    type: String,
    required: [true, 'Repayment Date Required']
  },
  isRepaymentDone: {
    type: Boolean,
    default: false
  }
});

const CreditRequest = mongoose.model('creditRequest', CreditRequestSchema);
module.exports = CreditRequest;
