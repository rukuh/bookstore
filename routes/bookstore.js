var express = require('express');
var router = express.Router();

var app = express();
app.use(express.static('public'));

exports.home =  function(req, res) {
  res.render('index', { title: 'Luke\'s Bookstore' });
};