var mongoose = require( 'mongoose' );
var express = require( 'express' );
var router = express.Router();

// Mongoose connection to MongoDB
mongoose.connect( 'mongodb://ec2-52-207-210-128.compute-1.amazonaws.com/test' );

var db = mongoose.connection;

db.on( 'error', function( err ) {
  console.log( 'connection error', err );
} );

db.once( 'open', function() {
  console.log( 'connected to db' );

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

  // GET bookshelf with parameters
  router.get( '/:skip', function( req, res ) {
  	var skip = parseInt( req.params.skip );
    var cat = req.query.category;
    var search = req.query.search;
	  var query = Book.
      find( { 'genre': new RegExp( cat ), 'title': new RegExp( search ) } ).
      limit( 30 ).
      skip( skip );

    query.exec( function( e, docs ) {
	    res.json( docs );
    } );
  } );
} );

module.exports = router;
