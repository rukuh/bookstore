$( function() {
  var current = 0;
  var url = '/books';

  current = request( url, $( '#filter' ).val(), $( '#search' ).val(), current );

  // Load books on scroll with conditional to check for end of book collection
  $( window ).data( 'ajaxready', true ).scroll( function() {
    if ($(window).data('ajaxready') == false) return;
    if ( $( window ).scrollTop() + $( window ).height() > $( document ).height() - 100 && $( '.fin' ).length === 0 ) {
        current = request( url, $( '#filter' ).val(), $( '#search' ).val(), current );
    }
  } );

  // Load books on category select
  $( '#filter' ).change( function() {
    $( '#bookshelf' ).empty();
    current = 0;
    current = request( url, $( '#filter' ).val(), $( '#search' ).val(), current);
  } );

  // Load books on search
  $( '#search' ).on( 'input propertychange paste', function( event ) {
    // Prevent multiple search requests while user is typing
    delay( function() {
      $( '#bookshelf' ).empty();
      current = 0;
      current = request( url, $( '#filter' ).val(), $( '#search' ).val(), current);
    }, 500 );
  } );
} );

function request( url, category, search, current ) {
  // Render bookshelves in ajax callback due to asynchonous request
  $(window).data('ajaxready', false);
  $.ajax( url + '/' + current + '?' + 'category=' + category + '&' + 'search=' + search )
  .done( function( responseJSON ) {
    Shelve( responseJSON );
    $(window).data('ajaxready', true);
  } );
  return current+30;
}
