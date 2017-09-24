const express = require('express');
const router = express.Router();
const Borrower = require('../models/borrower');
const Lender = require('../models/lender');
const jwt             = require('jsonwebtoken');
const config          = require('../config');

//Index Page
router.get('/', (req, res, next)=> {
  res.send({
    message: "This is a borrowing and lending api"
  })
})

//Register a new Borrower or Lender
router.post('/register', (req, res, next)=> {
  let User;
  if(req.body.type === 'borrower') User = Borrower;
  else User = Lender;

  User.create(req.body).then((user)=>{
      res.send(user);
  }).catch(next);
});

//Authenticate User and Send JWT token
router.post('/authenticate', (req, res)=> {
  let User;
  if(req.body.role === 'borrower') {
    User = Borrower;
  }
  else {
    User = Lender;
  }
  // find the user
  User.findOne({
    email: req.body.email
  }, (err, user)=> {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      console.log(user.password+" "+req.body.password);
      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({data: user.email}, config.secret, {
          expiresIn: '24h' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

// route middleware to verify a token
router.use((req, res, next)=> {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, (err, decoded)=> {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

module.exports = router;
