const express = require('express');
const router = express.Router();
const CreditRequest = require('../models/creditRequest');
const Borrower = require('../models/borrower');
const Lender = require('../models/lender');

router.post('/request/:id', (req, res, next)=> {
  Borrower.findOne({_id: req.params.id}).then((borrower)=> {
    if(borrower.creditLimit < req.body.amount) {
      res.send({
        error: "Request amount exceeds credit limit"
      });
    }
    else {
      Borrower.findOne({_id: req.params.id}).then((borrower)=> {
        //update credit limit
        let updatedCreditLimit = {
          creditLimit: borrower.creditLimit - req.body.amount
        };
        Borrower.findByIdAndUpdate(
          {_id: req.params.id},
          updatedCreditLimit
        ).then(()=> {
          Borrower.findOne({_id: req.params.id}).then((borrower)=> {
            console.log(borrower);
          });
        })
      })
      CreditRequest.create(req.body).then((creditRequest)=> {
        res.send(creditRequest);
      });
    }
  })
});

router.get('/my-requests', (req, res, next)=> {
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
