// Add delay to function if necessary
var delay = ( function() {
var timer = 0;
return function( callback, ms ) {
  clearTimeout( timer );
  timer = setTimeout( callback, ms );
};
} )();
