const express = require('express');
const router = express.Router();

//Collections
const Borrower = require('../models/borrower');
const Lender = require('../models/lender');
const CreditRequest = require('../models/creditRequest');

//Set the repayment flag to true
router.put('/paid/:id', (req, res, next)=> {
  CreditRequest.findByIdAndUpdate(
    {_id: req.params.id},
    {isRepaymentDone: true}
  ).then((creditRequest)=> {

    //Update the credit limit
    Borrower.findOne({_id: creditRequest.borrower}).then((borrower)=> {
        let updatedCreditLimit = {
          creditLimit: borrower.creditLimit + creditRequest.amount
        }
        console.log(updatedCreditLimit);
        Borrower.findByIdAndUpdate(
          {_id: creditRequest.borrower}, updatedCreditLimit
        )
        console.log(borrower);
      }
    );

    //Send Updated credit request
    CreditRequest.findOne(
      {_id: req.params.id}
    ).then((creditRequest)=> {
      res.send(creditRequest);
    });
  });
});

//Get the complete list of requests with required details
router.get('/request-list', (req, res, next)=> {
  CreditRequest.find({}).then((requests)=> {
    res.send(requests);
  });
});

//Get the list of borrowers with required details
router.get('/borrower-list', (req, res, next)=> {
  Borrower.find({}).then((borrowers)=> {
    //send required details
    let borrowersList = [];
    for(let i = 0, max = borrowers.length; i < max; i++) {
      borrowersList.push({
        name: borrowers[i].name,
        email: borrowers[i].email,
        creditLimit: borrowers[i].creditLimit
      });
    }
    res.send(borrowersList);
  });
});

module.exports = router;
