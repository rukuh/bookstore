var express = require( 'express' );
var router = express.Router();

var app = express();
app.use( express.static( 'public' ) );

// GET home page
router.get( '/', function( req, res, next ) {
  res.render( 'index', { title: 'Luke\'s Bookstore' } );
} );

module.exports = router;
