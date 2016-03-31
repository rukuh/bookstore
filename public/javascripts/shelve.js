// Append HTML for bookshelves
function Shelve( bookshelf, cart, target ) {
  $( '.loader' ).show();

  // Conditional to check for empty response denoting end
  if ( bookshelf.length === 0 ) {
    // Conditional to notify user if there are no books found containing search string
    if ( $( '#search' ).val() !== '' && $( '.book' ).length === 0 ) {
      $( '#bookshelf' ).append(' <div id="bookshelf-empty">There are no books with "' + $( '#search' ).val() + '" in the title');
    }

    // Create node that acts as indicator for end of book collection
    $( '#bookshelf' ).detach().append( '<div class="fin"></div>' ).appendTo( $( '.wrapper' ) );
  } else {
    // Create nodes and append to target
    $.each( bookshelf, function( key, data ) {
        var book = $( '<div class="book">' +
        '<img class="cover" src=' + data.cover + '>' +
        '<div class="title">' + data.title + '</div>' +
        '<div class="author">by ' + data.author + '</div>' +
        '<div class="short_desc">' + data.short_desc + '</div>' +
        '<div class="long_desc">' + data.long_desc + '</div>' +
        '<div class="genre">' + data.genre + '</div>' +
        '</div>' );
      if ( target === '#bookshelf' ) {
        book.append( '<button class="icon-cart" data-id="' + data._id + '""></button>' );
      }
      if ( target === '#side-cart' ) {
        // Return index of current book
        var index = cart.findIndex( function( element ) {
          return element.id == data._id;
        } );

        // Set HTML quantity from cart object
        book.append( '<input class="quantity" type="number" value="' + cart[index].quantity + '" data-id="' + data._id + '">' );
        book.append( '<button class="icon-plus" data-id="' + data._id + '"></button>' );
        book.append( '<button class="icon-minus" data-id="' + data._id + '"></button>' );
      }
      $( target ).detach().append( book ).appendTo( $( '.wrapper' ) );
    } );
  }
  $( '.loader' ).hide();
}
