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
      cover : '<img class="cover" src='+$('.active').find('.cover').attr('src')+'>',
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
    if ($(window).scrollTop() > 102) {
      $('header').css({ 'border-bottom' : 'outset' , 'border-width' : '1px'});
    } else { $('header').css({ 'border-bottom' : '' }); }
  });
}

window.onload = eventListeners;