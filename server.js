const express         = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const routes          = require('./api/routes');
const borrowerRoutes  = require('./api/borrowerRoutes');
const lenderRoutes    = require('./api/lenderRoutes');
const config          = require('./config');
const jwt             = require('jsonwebtoken');

//Connect to mongodb
mongoose.connect('mongodb://localhost/business');
mongoose.Promise = global.Promise;

app.set('superSecret', config.secret); //Secret Variable

//Middleware
app.use(bodyParser.json());

//Routing
app.use(routes);
app.use(borrowerRoutes);
app.use(lenderRoutes);


//Error Handler
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err.message
    });
});

app.listen(process.env.port || 8000, () => {
    console.log('Server Running on port 8000...');
});
