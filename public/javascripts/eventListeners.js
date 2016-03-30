// Event listeners
function eventListeners() {
var cart = [];

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
  clearTimeout( window.atc );
  $( '#cart-empty' ).hide();

  // Add book id to cart variable
  cart.push( $( this ).parent().find( '.id' ).text() );
  modal.open( { content: "Added to cart" } );
  window.atc = setTimeout( function() {
    modal.close();
  }, 3000 );
} );

// Event listener for collapsing the cart sidebar
$( '.icon-right' ).click( function() {
  modal.close();
  $('#cart').prop('checked', false);
} );

// Event listener for increment quantity button
$( '#side-cart' ).on( 'click', '.icon-plus', function() {
  // Increment quantity
  $( this ).siblings( '.quantity' ).val( parseInt( $( this ).siblings( '.quantity' ).val() ) + 1);

  // Add book id to cart variable on increment
  cart.push( $( this ).siblings( '.id' ).text() );
} );

// Event listener for decrement quantity button
$( '#side-cart' ).on( 'click', '.icon-minus', function(event) {
  event.stopPropagation();

  // Decrement quantity
  $( this ).siblings( '.quantity' ).val( parseInt( $( this ).siblings( '.quantity' ).val() ) - 1);

  // Remove book id from cart variable on decrement
  cart.splice( cart.indexOf( $( this ).siblings( '.id' ).text() ), 1 );

  // Conditional to remove book node from cart if quantity is zero
  if ( $( this ).siblings( '.quantity' ).val() == 0 ) {
    $( this ).parent().remove();
  }

  // Conditional to if cart is empty and display message
  if ( cart.length === 0 ) {
    $( '#cart-empty' ).show();
  }
} );

// Event listener to close modal and cart sidebar on click outside
$( '#overlay' ).click( function() {
  modal.close();
  $('#cart').prop('checked', false);
} );

// Event listener to display modal for selected book
$( '#bookshelf' ).on( 'click', '.book', function() {
  // Prevent modal timeout from leaking to new modals
  clearTimeout( window.atc );
  $( this ).addClass( 'active' );

  // Set modal dynamically by passing content as a parameter
  modal.open( {
    content: $( this ).children().clone()
  } );
} );

// Event listener to close modal and cart sidebar on esc
$( document ).on( 'keydown', function( event ) {
  if ( event.keyCode === 27 ) {
    modal.close();
    $('#cart').prop('checked', false);
  }
} );
}

window.onload = eventListeners;
