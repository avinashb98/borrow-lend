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
  })
})

module.exports = router;
