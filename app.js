'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

var app = express();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/do_nothing_with_friends';
mongoose.connect(mongoUri);

var app = require('./lib/app').instance();
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);
