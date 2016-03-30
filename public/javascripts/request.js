// Render bookshelves in ajax callback due to async
function request( url, current, data) {
  // Prevent multiple ajax queries if already in process
  $(window).data('ajaxready', false);
  $.ajax( {
  	url: url + current,
  	data: data
  } ).
  done( function( responseJSON ) {
    Shelve( responseJSON, '', '#bookshelf' );
    $(window).data('ajaxready', true);
  } );
  return current+30;
}

// Render cart in ajax callback due to async
function postCart( data ) {
  $( '#side-cart > .book' ).remove();
  // Prevent multiple ajax queries if already in process
  $( window ).data('ajaxready', false);
  $.ajax( {
    url: '/cart',
    type: 'POST',
    data: JSON.stringify( data ),
    contentType: "application/json",
    processData: false
  } ).
  done( function( response ) {
    $(window).data('ajaxready', true);
    if ( response.length === 0 ) {
      $('#side-cart > p').show();
    } else {
      $('#side-cart > p').hide();
      Shelve( response, data, '#side-cart' );
    }
  } );
}
