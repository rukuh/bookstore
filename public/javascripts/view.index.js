$(function() {	
  var cart = [];

  // Render bookshelves in ajax callback due to asynchonous request
  var bookshelf = $.ajax( 'bookshelf.json' )
    .done( function(responseJSON) {
      var current = 0;

      Shelve(responseJSON,current,$('#filter').val())

      $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          current = current + 60;
          Shelve(responseJSON,current,$('#filter').val());
        }
      });
    });

  // Append HTML for bookshelves
  function Shelve(bookshelf,current,filter) {
    $('.loading').show();
    $.each(bookshelf.slice(current,current+60), function (key, data) {
      if ( key < 60 ){
        if ( filter == "All Categories" ) {
          var book = $('<div class="book"></div>');
          book.css({ 'background' : 'url('+data.cover+')', 'background-size' : '100%' })
          book.append('<div class="id" style="display:none">'+data._id+'</div>');
          book.append('<div class="cover" src='+data.cover+'>');
          book.append('<div class="title">'+data.title+'</div>');
          book.append('<div class="author">by '+data.author+'</div>');
          book.append('<div class="short_desc">'+data.short_desc+'</div>');
          book.append('<div class="long_desc">'+data.long_desc+'</div>');
          book.append('<div class="genre" style="display: none">'+data.genre+'</div>');
          book.append('<button class="add_to_cart" style="display:none"><span>Add to Cart </span></button>');

          $('#bookshelf').detach().append(book).appendTo($('.wrapper'));
        } else { 
            if ( data.genre == filter ) {
              var book = $('<div class="book"></div>');
              book.css({ 'background' : 'url('+data.cover+')', 'background-size' : '100%' })
              book.append('<div class="id" style="display:none">'+data._id+'</div>');
              book.append('<div class="cover" src='+data.cover+'>');
              book.append('<div class="title">'+data.title+'</div>');
              book.append('<div class="author">by '+data.author+'</div>');
              book.append('<div class="short_desc">'+data.short_desc+'</div>');
              book.append('<div class="long_desc">'+data.long_desc+'</div>');
              book.append('<div class="genre" style="display: none">'+data.genre+'</div>');
              book.append('<button class="add_to_cart" style="display:none"><span>Add to Cart </span></button>');

              $('#bookshelf').detach().append(book).appendTo($('.wrapper'));
            }
        }
      } else {
          return bookshelf;
      }
    });
    $('.loading').hide();
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
    $('#bookshelf').on('mouseenter','.book',function() {
      $(this).children('button').show();
    });

    $('#bookshelf').on('mouseleave','.book',function() {
      $(this).children('button').hide();
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
      var id = $(this).parent().find('.id').text();
      $.each(bookshelf.responseJSON, function(key,data) {
          if (data._id == id) {
            cart.push(data);
            return false;
          }          
      });
      console.log(cart);
      modal.open({ content: "Added to cart"});
      setTimeout(function(){
        modal.close();
      },3000); 
    });

    $("#filter").change(function() {
      if ($(this).val() == "All Categories") {
        $('.book').show();
      } else {
          $('.book').hide();
          $('.genre:contains('+$(this).val()+')').parent().show();
      }
    });

    $('#search').on('input propertychange paste', function(event) {
      event.preventDefault();
      $('.book').hide();
      $('.title:contains('+$(this).val()+')').parent().show();
    });

    $(window).scroll(function () { 
      if ($(window).scrollTop() > 173) {
        $('header').css({ 'border-bottom' : 'outset' , 'border-width' : '1px'});
      }
      if ($(window).scrollTop() < 173) {
        $('header').css({ 'border-bottom' : '' });
      }
    });
  });
});