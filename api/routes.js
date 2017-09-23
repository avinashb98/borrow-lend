const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
  res.send({
    message: "This is a success"
  })
})

router.post('/register', (req, res, next)=> {
  if(req.body.type === 'borrower') {
    res.send("borrower registered");
  }
  if(req.body.type === 'lender') {
    res.send("lender registered");
  }
})

module.exports = router;
