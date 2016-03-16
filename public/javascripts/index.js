$(function() {	
  var cart = [];

  // Render bookshelves in ajax callback due to asynchonous request
  var bookshelf = $.ajax( 'bookshelf.json' )
    .done( function(responseJSON) {
      var current = Shelve(responseJSON,0);

      // Load more books on scroll
      $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          current = Shelve(responseJSON,current);
        }

        Filter();
      });

      $("#filter").change(function() {
        $('.book').removeClass('filter');
        Filter();

        while ( $(window).height() >= $(document).height() && current < responseJSON.length ) {
          current = Shelve(responseJSON,current);
          Filter();
        }
      });

      $('#search').on('input propertychange paste', function(event) {
        event.preventDefault();
        Search();
      });
    });

  // Append HTML for bookshelves
  function Shelve(bookshelf,current) {
    $('.loading').show();
    $.each(bookshelf.slice(current), function (key, data) {
      if ( key < 60 ) {
        Render(data);
      } else { return false; }
    });
    $('.loading').hide();
    return current+60;
  }

  // Create nodes and append to #bookshelf
  function Render(data) {
    var book = $('<div class="book">'+
      '<div class="id" style="display:none">'+data._id+'</div>'+
      '<div class="cover" src='+data.cover+'></div>'+
      '<div class="title">'+data.title+'</div>'+
      '<div class="author">by '+data.author+'</div>'+
      '<div class="short_desc">'+data.short_desc+'</div>'+
      '<div class="long_desc">'+data.long_desc+'</div>'+
      //'<div class="genre" style="display: none">'+data.genre+'</div>'+
      '<div class="genre" style="background-color: white">'+data.genre+'</div>'+
      '<button class="add_to_cart" style="display:none"><span>Add to Cart </span></button>'+
      '</div>');
    book.css({ 'background' : 'url('+data.cover+')', 'background-size' : '100%' });
    $('#bookshelf').detach().append(book).appendTo($('.wrapper'));
  }

  // Filters loaded nodes based on category
  function Filter() {
    $('.genre:contains('+$('#filter').val()+')').parent().addClass('filter');
        if ($('#filter').val() == 'All') {
          $('.book').show();
        } else {
          $('.book:not(.filter)').hide();
          $('.genre:contains('+$('#filter').val()+')').parent().show();
        }
  }

  // Filters loaded nodes based on search
  function Search() {
    $('#search').on('input propertychange paste', function(event) {
      event.preventDefault();
      $('.book').hide();
      $('.title:contains('+$(this).val()+')').parent().show();
    });
  }

  // Dynamic modal takes contents as parameter
  var modal = (function(){
    var method = {}, $overlay, $modal, $content, $close;

    // Append the HTML
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#">close</a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function(){
      $('#bookshelf').append($overlay, $modal);
    });

    // Center the modal in the viewport
    method.center = function () {
      var top, left;

     top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
     left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

     $modal.css({
         top:top + $(window).scrollTop(), 
         left:left + $(window).scrollLeft()
     });
    };

    // Open the modal
    method.open = function (settings) {
      $content.empty();
      $.each(settings, function(key,item){
        $content.append(item);
      });

      $modal.css({
          width: settings.width || 'auto', 
          height: settings.height || 'auto'
      })

      method.center();

      $(window).bind('resize.modal', method.center);

      $modal.slideDown();
      $overlay.show();
    };
    
    // Close the modal
    method.close = function () {
      $('.active').removeClass('active');
      $modal.hide();
      $overlay.hide();
      $content.empty();
      $(window).unbind('resize.modal');
    };

    $close.click(function(e){
      e.preventDefault();
      method.close();
    });

    return method;
  }());
  
  // Event listeners for styles and add to cart functionality
  $(document).ready(function(){
    $('#bookshelf').on('mouseenter mouseleave','.book',function() {
      $(this).children('button').toggle();
    });

    $('#bookshelf').on('click','.book',function() {
      $(this).addClass('active');
		  modal.open({
        cover : '<img class="cover" src='+$('.active').find('.cover').attr('src')+'>',
        content : $(this).children().clone()
      });
    });

    $('#bookshelf').on('click','.add_to_cart',function(event) {
      event.stopPropagation();
      cart.push($(this).parent().find('.id').text());
      console.log(cart);
      modal.open({ content: "Added to cart" });
      setTimeout(function(){
        modal.close();
      },3000); 
    });

    $(window).scroll(function () { 
      if ($(window).scrollTop() > 102) {
        $('header').css({ 'border-bottom' : 'outset' , 'border-width' : '1px'});
      } else { $('header').css({ 'border-bottom' : '' }); }
    });
  });
});