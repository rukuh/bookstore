// Event listeners
function eventListeners() {
var cart = [];

// Initial load
var current = request( '/books/', 0, 'category=' + $( '#filter' ).val() + '&search=' + $( '#search' ).val() );

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
  current = request( '/books/', 0, 'category=' + $( '#filter' ).val() + '&search=' + $( '#search' ).val());
} );

// Load books on search
$( '#search' ).on( 'input propertychange paste', function( event ) {
  // Prevent multiple search requests while user is typing
  delay( function() {
    $( '#bookshelf' ).empty();
    current = request( '/books/', 0, 'category=' + $( '#filter' ).val() + '&search=' + $( '#search' ).val());
  }, 500 );
} );

// Event listener to style nav and top button
$( window ).scroll( function() {
  if ( $( window ).scrollTop() > $( 'nav' ).height() ) {
    $( 'nav' ).css( { 'border-bottom': 'outset', 'border-width': '1px' } );
    $( '#top' ).css( { 'display': 'block' } );
  } else {
    $( 'nav' ).css( { 'border-bottom': '' } );
    $( '#top' ).css( { 'display': 'none' } );
  }
} );

// Event listener to display grid view
$( '.icon-grid' ).click( function() {
  $( '#bookshelf' ).removeClass( 'list' );
} );

// Event listener to display list view
$( '.icon-list' ).click( function() {
  $( '#bookshelf' ).addClass( 'list' );
} );

// Event listener to display cart sidebar
$( '.icon-cart' ).data( 'ajaxready', true ).click( function() {
  // Prevent concurrent ajax requests
  if ( $( window ).data( 'ajaxready' ) === false || $( '#cart' ).checked ) return;
  clearTimeout( window.atc );
  $( '#overlay' ).show();
  postCart( cart );
} );

// Event listener for top button
$( '.icon-up' ).click( function() {
  $( 'html, body' ).animate( { scrollTop: 0 }, 'fast' );
} );

// Event listener for add to cart actions
$( '.wrapper' ).on( 'click', '.icon-cart', function() {
  event.stopPropagation();
  $( '#cart-empty' ).hide();

  // Object to add to cart
  var item = { 'id' : $( this ).data( 'id' ), 'quantity' : 1 };

  // Return index of current book
  var index = cart.findIndex( function( element ) {
    return element.id === item.id;
  } );

  // Conditional to increment quantity if book exists, add book if not
  if ( index > -1 ) {
    cart[ index ].quantity++;
  } else {
    cart.push( item );
  }
  clearTimeout( window.atc );
  modal.open( { content: "Added to book bag" } );
  window.atc = setTimeout( function() {
    modal.close();
  }, 3000 );
} );

// Event listener for collapsing the cart sidebar
$( '.icon-right' ).click( function() {
  modal.close();
  $( '#cart' ).prop( 'checked', false );
} );

// Event listener for increment quantity button
$( '#side-cart' ).on( 'click', '.icon-plus', function() {
  // Increment quantity
  $( this ).siblings( '.quantity' ).val( parseInt( $( this ).siblings( '.quantity' ).val() ) + 1);

  // Return index of current book
  var index = cart.findIndex( function( element ) {
    return element.id === $( event.target ).data( 'id' );
  } );

  // Set cart quantity to HTML quantity
  cart[index].quantity = parseInt($( this ).siblings( '.quantity' ).val());
} );

// Event listener for input change in quantity
$( '#side-cart' ).on( 'input propertychange paste', '.quantity', function( event ) {
  // Prevent requests while user is typing
  delay( function() {

    // Return index of current book
    var index = cart.findIndex( function( element ) {
      return element.id === $( event.target ).data( 'id' );
    } );

    // Conditional to remove book node from cart if quantity is less than 1
    if ( $( event.target ).val() < 1 ) {
      $( event.target ).parent().remove();
      cart.splice( index, 1 );
    } else {
      // Set cart quantity to HTML quantity
      cart[index].quantity = $( event.target ).val();
    }

    console.log(cart);
  }, 500 );
} );

// Event listener for decrement quantity button
$( '#side-cart' ).on( 'click', '.icon-minus', function(event) {
  event.stopPropagation();

  // Decrement quantity
  $( this ).siblings( '.quantity' ).val( parseInt( $( this ).siblings( '.quantity' ).val() ) - 1);

  // Return index of current book
  var index = cart.findIndex( function( element ) {
    return element.id === $( event.target ).data( 'id' );
  } );

  // Conditional to remove book node from cart if quantity is zero
  if ( $( this ).siblings( '.quantity' ).val() == 0 ) {
    $( this ).parent().remove();
    cart.splice( index, 1 );
  } else {
    // Set cart quantity to HTML quantity
    cart[ index ].quantity = parseInt($( this ).siblings( '.quantity' ).val());
  }

  // Conditional to if cart is empty and display message
  if ( cart.length === 0 ) {
    $( '#cart-empty' ).show();
  }
} );

// Event listener to close modal and cart sidebar on click outside
$( '#overlay' ).click( function() {
  modal.close();
  $( '#cart' ).prop( 'checked', false );
} );

// Event listener to display modal for selected book
$( '#bookshelf' ).on( 'click', '.book', function() {
  $( this ).addClass( 'active' );

  // Prevent modal timeout from leaking to new modals
  clearTimeout( window.atc );

  // Set modal dynamically by passing content as a parameter
  modal.open( {
    content: $( this ).children().clone()
  } );
} );

// Event listener to close modal and cart sidebar on esc
$( document ).on( 'keydown', function( event ) {
  if ( event.keyCode === 27 ) {
    modal.close();
    $( '#cart' ).prop( 'checked', false );
  }
} );
}

window.onload = eventListeners;
