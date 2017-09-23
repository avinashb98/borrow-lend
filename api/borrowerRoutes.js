const express = require('express');
const router = express.Router();
const CreditRequest = require('../models/creditRequest');
const Borrower = require('../models/borrower');
const Lender = require('../models/lender');

router.post('/request', (req, res, next)=> {
  CreditRequest.create(req.body).then((creditRequest)=> {
    res.send(creditRequest);
  })
});

router.get('/request-list', (req, res, next)=> {
  CreditRequest.find({
    borrower: req.query.id
  }).then((requests)=> {

    //send only the required fields (amount, dueDate, flag)
    let requestList = [];
    for(let i = 0, max = requests.length; i < max; i++) {
      requestList.push({
        amount: requests[i].amount,
        dueDate: requests[i].dueDate,
        isRepaymentDone: requests[i].isRepaymentDone
      });
    }
    res.send(requestList);
  });
})

module.exports = router;
