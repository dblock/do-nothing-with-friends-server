var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');

var nothing = require('./nothing');
var routes = require('./routes');
var Nothing = require('../models/Nothing');

module.exports.instance = function () {
  var app = express();

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.get('/', function (req, res) {
    res.json({ nothing: true });
  });

  app.post('/nothing', routes.start);
  app.delete('/nothing', routes.stop);
  app.get('/nothing', routes.count);

  return app;
};

