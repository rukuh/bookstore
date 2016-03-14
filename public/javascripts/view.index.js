$(function() {	
  /*$('#add-new-fact').cpck(function() {
    
    var name = $('#right-column h2').text();
    var fact = $('#new-fact').val();
  
    $.ajax({
      type: "POST",
      url: "/hero/add-fact",
      data: JSON.stringify({ name: name, fact: fact }),
      contentType: "apppcation/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $('<p>').appendTo('#facts').text(fact);
        $('#new-fact').val('');
      },
      error: function(err) {
        var msg = 'Status: ' + err.status + ': ' + err.responseText;
        alert(msg);
      }
    });
    return false;
  });
  
  var name = $('#right-column h2').text();
  var fact = $('#new-fact').val();*/

  var cart = [];
  
  var bookshelf = $.ajax({
    url: 'bookshelf.json',
    dataType: 'json',
    beforeSend: function() {
      $('.wrapper').append('<p>Retrieving books...</p>')
    },
    complete: function() {
      $.each(bookshelf.responseJSON, function (key, data) {
        var book = $('<div class="book" data-id="'+data._id+'"></div>');
        book.append('<img class="cover" src='+data.cover+'>');
        book.append('<div class="title">Title: '+data.title+'</div>');
  	    book.append('<div class="author">Author: '+data.author+'</div>');
  	    book.append('<div class="short_desc">Short Description: '+data.short_desc+'</div>');
  	    book.append('<div class="long_desc" data="'+data.long_desc+'"</div></div>');
        book.append('<div class="genre">Genre: '+data.genre+'</div>');
        book.append('<button class="add_to_cart">Add to Cart</button></div>');

        $('#bookshelf').detach().append(book).appendTo($('.wrapper'));
      });
      $('.wrapper').find('p').remove();
    }
  });

  var modal = (function(){
    var 
    method = {},
    $overlay,
    $modal,
    $content,
    $close;

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
  
  $(document).ready(function(){
    $('#bookshelf').on('mouseenter','.book',function() {
      $(this).css({'background':'rgba(0,0,0,0.1)'});
    });

    $('#bookshelf').on('mouseleave','.book',function() {
      $(this).css({'background': ''}); 
    });

    $('#bookshelf').on('click','.book',function() {
      $(this).addClass('active');
		  modal.open({
        id : '',
        cover : '<img class="large_cover" src='+$('.active').find('.cover').attr('src')+'>',
        title : '<div class="title">'+$('.active').find('.title').text()+'</div',
        author : '<div class="author">'+$('.active').find('.author').text()+'</div',
        long_desc : '<div class="long_desc" data="'+$('.active').find('.long_desc').attr('data')+'">Long Description: '+$('.active').find('.long_desc').attr('data')+'</div',
        button : '<button class="add_to_cart">Add to Cart</button></div>'
      });
    });

    $('#bookshelf').on('click','.add_to_cart',function(event) {
      event.stopPropagation();
      cart.push({
        id : $(this).parent().data('id'),
        cover : $(this).parent().find('img').attr('src'),
        title : $(this).parent().find('.title').text(),
        author : $(this).parent().find('.author').text(),
        short_desc : $(this).parent().find('.short_desc').text(),
        long_desc : $(this).parent().find('.long_desc').attr('data')
      });
      modal.open({ content: "Added to cart"});
      console.log(cart);
    });

    $("#filter").change(function() {
      console.log($(this).val());
      $('.book').hide();
      $('.genre:contains('+$(this).val()+')').parent().show();
    });

    $('#search').on('input propertychange paste', function(event) {
      event.preventDefault();
      $('.book').hide();
      $('.title:contains('+$(this).val()+')').parent().show();
    });
  });
});