// Render bookshelf in ajax callback due to async
function request( url, current, data) {
  // Prevent concurrent ajax requests
  $( window ).data( 'ajaxready', false );
  $.ajax( {
  	url: url + current,
  	data: data
  } ).
  done( function( responseJSON ) {
    Shelve( responseJSON, '', '#bookshelf' );
    $(window).data('ajaxready', true);
  } );
  return current + 30;
}

// Render cart in ajax callback due to async
function postCart( data ) {
  // Prevent concurrent ajax requests
  $( window ).data( 'ajaxready' , false );
  $( '#side-cart > .book' ).remove();
  $.ajax( {
    url: '/cart',
    type: 'POST',
    // Map ids from cart object
    data: JSON.stringify( data.map( function( element ) { return element.id; } ) ),
    contentType: "application/json",
    processData: false
  } ).
  done( function( response ) {
    if ( response.length === 0 ) {
      $( '#cart-empty' ).show();
    } else {
      $( '#cart-empty' ).hide();
      Shelve( response, data, '#side-cart' );
    }
    $( window ).data( 'ajaxready', true );
  } );
}
