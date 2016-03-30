$( function() {
  var current = 0;

  // Initial load
  current = request( '/books/', current, 'category=' + $( '#filter' ).val() + '&search=' + $( '#search' ).val() );

  // Load books on scroll with conditional to check for end of book collection
  $( window ).data( 'ajaxready', true ).scroll( function() {
    // Prevent concurrent ajax requests
    if ( $( window ).data( 'ajaxready' ) === false) return;
    if ( $( window ).scrollTop() + $( window ).height() > $( document ).height() - 100 && $( '.fin' ).length === 0 ) {
      current = request( '/books/' , current, 'category=' + $( '#filter' ).val() + '&search=' + $( '#search' ).val() );
    }
  } );

  // Load books on category select
  $( '#filter' ).change( function() {
    $( '#bookshelf' ).empty();
    current = 0;
    current = request( '/books/', current, 'category=' + $( '#filter' ).val() + '&search=' + $( '#search' ).val());
  } );

  // Load books on search
  $( '#search' ).on( 'input propertychange paste', function( event ) {
    // Prevent multiple search requests while user is typing
    delay( function() {
      $( '#bookshelf' ).empty();
      current = 0;
      current = request( '/books/', current, 'category=' + $( '#filter' ).val() + '&search=' + $( '#search' ).val());
    }, 500 );
  } );
} );
