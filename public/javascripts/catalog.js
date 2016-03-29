// Append HTML for bookshelves
function Shelve( bookshelf, target ) {
  $( '.loader' ).show();
  // Conditional to check for empty response denoting end
  if ( bookshelf.length == 0 ){
    if ( $( '#search' ).val() != '' && $( '.book' ).length == 0 ) {
      modal.open( { content: "There are no books with '" + $( '#search' ).val() + "' in the title." } );
    }
    window.atc = setTimeout( function(){
      modal.close();
    }, 3000 );
    // Create node that acts as indicator for end of book collection
    $( '#bookshelf' ).detach().append( '<div class="fin"></div>' ).appendTo( $( '.wrapper' ) );
  } else {
    $.each( bookshelf, function( key, data ) {
        Render( data, target );
    } );
  }
  $( '.loader' ).hide();
}

// Create nodes and append to target
function Render( data, target ) {
  var book = $( '<div class="book">' +
    '<div class="id">' + data._id + '</div>' +
    '<img class="cover" src=' + data.cover + '>' +
    '<div class="title">' + data.title + '</div>' +
    '<div class="author">by ' + data.author + '</div>' +
    '<div class="short_desc">' + data.short_desc + '</div>' +
    '<div class="long_desc">' + data.long_desc + '</div>' +
    '<div class="genre">' + data.genre + '</div>' +
    '<button class="add_to_cart icon-basket"></button>' +
    '</div>');
  $( target ).detach().append( book ).appendTo( $( '.wrapper' ) );
}
