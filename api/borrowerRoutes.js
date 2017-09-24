const express = require('express');
const router = express.Router();
//Import collections
const CreditRequest = require('../models/creditRequest');
const Borrower = require('../models/borrower');
const Lender = require('../models/lender');
const config = require('../config');

//Post for a credit request
router.post('/request/:id', (req, res, next)=> {
  //Finding the borrower corresponding to the id
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
        //update the credit limit of the borrower
        Borrower.findByIdAndUpdate(
          {_id: req.params.id},
          updatedCreditLimit
        ).then(()=> {
          Borrower.findOne({_id: req.params.id}).then((borrower)=> {
            console.log(borrower);
          });
        })
      })
      //Create a credit request if the limit is more than the request
      CreditRequest.create(req.body).then((creditRequest)=> {
        res.send(creditRequest);
      });
    }
  })
});

//Get the list of all the requests made by the borrower
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
