const express = require('express');
const router = express.Router();
const Borrower = require('../models/borrower');
const Lender = require('../models/lender');
const CreditRequest = require('../models/creditRequest');

router.put('/paid/:id', (req, res, next)=> {
  CreditRequest.findByIdAndUpdate(
    {_id: req.params.id},
    {isRepaymentDone: true}
  ).then(()=> {
    //Send Updated credit request
    CreditRequest.findOne(
      {_id: req.params.id}
    ).then((creditRequest)=> {
      res.send(creditRequest);
    });
  });
});

router.get('/request-list', (req, res, next)=> {
  CreditRequest.find({}).then((requests)=> {
    res.send(requests);
  });
});

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
