// Event listeners
function eventListeners() {
  var cart = [];

  // Event listener to open modal for selected book
  $('#bookshelf').on('click','.book',function() {
    $(this).addClass('active');
    // Prevent modal timeout from leaking to new modals
    clearTimeout(window.atc);
    // Set modal dynamically by passing content as a parameter
	  modal.open({
      content : $(this).children().clone()
    });
  });

  // Event listener to handle add to cart actions
  $('.wrapper').on('click','.add_to_cart',function(event) {
    event.stopPropagation();
    cart.push($(this).parent().find('.id').text());
    console.log(cart);
    modal.open({ content: "Added to cart" });
    window.atc = setTimeout(function(){
      modal.close();
    },3000); 
  });

  // Event listener to add border to sticky nav
  $(window).scroll(function () { 
    if ($(window).scrollTop() > $('nav').height()) {
      $('nav').css({ 'border-bottom' : 'outset' , 'border-width' : '1px'});
    } else { $('nav').css({ 'border-bottom' : '' }); }
  });

  // Event listener for grid view
  $('nav').on('click','.grid',function(event) {
    $('#bookshelf').removeClass('list');
    $('button.grid').addClass('selectedview');
    $('button.list').removeClass('selectedview');
  });

  // Event listener for list view
  $('nav').on('click','.list',function(event) {
    $('#bookshelf').addClass('list');
    $('button.list').addClass('selectedview');
    $('button.grid').removeClass('selectedview');
  });
}

window.onload = eventListeners;