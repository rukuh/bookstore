var mongoose = require( 'mongoose' );
var express = require( 'express' );
var router = express.Router();

Book = mongoose.model( 'Book' );

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

module.exports = router;
