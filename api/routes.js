const express = require('express');
const router = express.Router();
const Borrower = require('../models/borrower');
const Lender = require('../models/lender');

//Index Page
router.get('/', (req, res, next)=> {
  res.send({
    message: "This is a borrowing and lending api"
  })
})

//Register a new Borrower or Lender
router.post('/register', (req, res, next)=> {
  if(req.body.type === 'borrower') {
    Borrower.create(req.body).then((borrower)=>{
        res.send(borrower);
    }).catch(next);
  }
  if(req.body.type === 'lender') {
    Lender.create(req.body).then((lender)=>{
        res.send(lender);
    }).catch(next);
  }
})

module.exports = router;
