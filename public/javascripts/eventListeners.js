// Event listeners
function eventListeners() {
var cart = [];

// Event listener to add styles to nav and scroll to top button
$( window ).scroll( function() {
  if ( $( window ).scrollTop() > $( 'nav' ).height() ) {
    $( 'nav' ).css( { 'border-bottom': 'outset', 'border-width': '1px' } );
    $( '#top' ).css( { 'display': 'block' } );
  } else {
    $( 'nav' ).css( { 'border-bottom': '' } );
    $( '#top' ).css( { 'display': 'none' } );
  }
} );

// Event listener for grid view
$( 'nav' ).on( 'click', '.gridlabel', function( event ) {
  $( '#bookshelf' ).removeClass( 'list' );
} );

// Event listener for list view
$( 'nav' ).on( 'click', '.listlabel', function( event ) {
  $( '#bookshelf' ).addClass( 'list' );
} );

// Event listener for cart view
$( 'nav' ).data( 'ajaxready', true).on( 'click', '.cartlabel', function( event ) {
  if ($(window).data('ajaxready') == false || $( '#cart' ).is( ":checked" )) return;
  showcart(cart);
} );

// Event listener to scroll to top
$( '#top' ).click( function() {
  $( 'html, body' ).animate( { scrollTop: 0 }, 'slow' );
  return false;
} );

// Event listener to handle add to cart actions
$( '.wrapper' ).on( 'click', '.add_to_cart,.icon-plus', function( event ) {
  event.stopPropagation();
  cart.push( $( this ).parent().find( '.id' ).text() );
  modal.open( { content: "Added to cart" } );
  console.log(cart);
  window.atc = setTimeout( function() {
    modal.close();
  }, 3000 );
  if ($(window).data('ajaxready') == false) return;
  showcart(cart);
} );

// Event listener to handle remove from cart actions
$( '.wrapper' ).on( 'click', '.icon-minus', function( event ) {
  event.stopPropagation();
  cart.splice(cart.indexOf($( this ).parent().find( '.id' ).text()), 1);
  modal.open( { content: "Removed from cart" } );
  console.log(cart);
  window.atc = setTimeout( function() {
    modal.close();
  }, 3000 );
  if ($(window).data('ajaxready') == false) return;
  showcart(cart);
} );

// Event listener to close modal on click outside
/*$(document).on('click', function(event) {
  if (!$(event.target).closest('#sidecart').length || !$(event.target).closest('.cartlabel').length) {
    $('#cart').removeAttr('checked');
  }
});*/

// Event listener to close modal on click outside
$( '#overlay' ).click( function() {
  modal.close();
} );

// Event listener to open modal for selected book
$( '#bookshelf' ).on( 'click', '.book', function() {
  $( this ).addClass( 'active' );
  // Prevent modal timeout from leaking to new modals
  clearTimeout( window.atc );
  // Set modal dynamically by passing content as a parameter
  modal.open( {
    content: $( this ).children().clone()
  } );
} );

// Event listener to close modal on esc
$( document ).on( 'keydown', function( e ) {
  if ( e.keyCode === 27 ) {
    modal.close();
  }
} );
}

window.onload = eventListeners;
