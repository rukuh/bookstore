var mongoose = require( 'mongoose' );

// Mongoose schema definition
var bookSchema = mongoose.Schema( {
  _id: String,
  cover: String,
  title: String,
  short_desc: String,
  long_desc: String,
  genre: String
} );

// Mongoose model definition
var Book = mongoose.model( 'Book', bookSchema, 'bookshelf' );

module.exports = Book;
