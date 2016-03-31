var mongoose = require( 'mongoose' );
var express = require( 'express' );
var router = express.Router();

Book = mongoose.model( 'Book' );

// POST book ids and return data
router.post( '/', function( req, res ){
  var query = Book.
    find( { '_id' : { $in: req.body } } );

  query.exec( function( e, docs ) {
    res.json( docs );
  } );
} );

module.exports = router;
