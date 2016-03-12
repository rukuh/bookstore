var express = require('express');
var router = express.Router();
//var book = require('./bookshelf');

var app = express();
app.use(express.static('public'));


//var books = {
//    Book1:{cover: '', title:'Book1', author: 'Luke Hyun', description: 'This is the first book.'},
//    Book2:{cover: '', title:'Book2', author: 'Luke Hyun', description: 'This is the second book.'},
//    Book3:{cover: '', title:'Book3', author: 'Luke Hyun', description: 'This is the third book.'},
//    Book4:{cover: '', title:'Book4', author: 'Luke Hyun', description: 'This is the fourth book.'},
//    Book5:{cover: '', title:'Book5', author: 'Luke Hyun', description: 'This is the fifth book.'}
//};

var books = require("../public/bookshelf.json");

for(var book in books) {
    console.log("key:"+book+", value:"+books[book].title);
}

exports.home =  function(req, res) {
  res.render('index', { title: 'Luke\'s Bookstore' });
  //res.render('index', { books: bks.title });
};