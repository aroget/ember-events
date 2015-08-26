var express        = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app            = express();

// set our port
var port = process.env.PORT || 3000;

// db
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hackathon');

// set the static files location
app.use(express.static(__dirname + '/frontend/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

require('./routes/routes')(app); // configure our routes

// startup our app at http://localhost:3000
app.listen(port);


// expose app
exports = module.exports = app;
