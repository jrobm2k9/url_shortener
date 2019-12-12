'use strict';

var express = require('express');

/* This is file that sets up the connection to mongodb.
  Needs to be called at the top of the file */
require('./api/models/db');

var cors = require('cors');

var app = express();
const bodyParser = require('body-parser');

// Basic Configuration 
var port = process.env.PORT || 3000;

// Let's the app know your adding more routes
const apiUrls = require('./api/routes/index');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

// Use the routes file (apiUrls) for all /api 
app.use('/api', apiUrls);

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
//app.get("/api/hello", function (req, res) {
  //res.json({greeting: 'hello API'});
//});


app.listen(port, function () {
  console.log('Node.js listening ...' + port);
});