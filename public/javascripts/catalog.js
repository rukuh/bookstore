// Append HTML for bookshelves
function Shelve( bookshelf, cart, target ) {
  clearTimeout( window.atc );
  $( '.loader' ).show();

  // Conditional to check for empty response denoting end
  if ( bookshelf.length === 0 ) {
    // Conditional to notify user if there are no books found containing search string
    if ( $( '#search' ).val() !== '' && $( '.book' ).length === 0 ) {
      modal.open( { content: "There are no books with '" + $( '#search' ).val() + "' in the title." } );
    }
    window.atc = setTimeout( function() {
      modal.close();
    }, 3000 );

    // Create node that acts as indicator for end of book collection
    $( '#bookshelf' ).detach().append( '<div class="fin"></div>' ).appendTo( $( '.wrapper' ) );
  } else {
    $.each( bookshelf, function( key, data ) {
        Render( data, cart, target );
    } );
  }
  $( '.loader' ).hide();
}

// Create nodes and append to target
function Render( data, cart, target ) {
  var book = $( '<div class="book">' +
    '<div class="id">' + data._id + '</div>' +
    '<img class="cover" src=' + data.cover + '>' +
    '<div class="title">' + data.title + '</div>' +
    '<div class="author">by ' + data.author + '</div>' +
    '<div class="short_desc">' + data.short_desc + '</div>' +
    '<div class="long_desc">' + data.long_desc + '</div>' +
    '<div class="genre">' + data.genre + '</div>' +
    '</div>');
  if ( target === '#bookshelf' ) {
    book.append( '<button class="icon-cart"></button>' );
  }
  if ( target === '#side-cart' ) {
    var count = cart.reduce( function( n, val ) {
      return n + ( val === data._id );
    }, 0 );
    book.append( '<input class="quantity" type="text" value=' + count + '>' );
    book.append( '<button class="icon-plus"></button>' );
    book.append( '<button class="icon-minus"></button>' );
  }
  $( target ).detach().append( book ).appendTo( $( '.wrapper' ) );
}
