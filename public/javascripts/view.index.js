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
  
  var bookshelf = $.getJSON("bookshelf.json", function() {
    $.each(bookshelf.responseJSON, function (key, data) {
      //$('.indicators').prepend('<li data-target="#bookshelf" data-slide-to='+key+'"</li>');
      $('#bookshelf').append('<div class="book" data="'+data._id+'"><img class="cover" src='+data.cover+'>');
      $('.book:last').append('<div class="title">Title: '+data.title+'</div>');
	    $('.book:last').append('<div class="author">Author: '+data.author+'</div>');
	    $('.book:last').append('<div class="short_desc">Short Description: '+data.short_desc+'</div>');
	    $('.book:last').append('<div class="long_desc" data="'+data.long_desc+'"</div></div>');
      $('.book:last').append('<button class="add_to_cart">Add to Cart</button></div>');
    });
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
      $('body').append($overlay, $modal);
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
      $content.empty().append(settings.content);

      var _id = $('.active').attr('data');
      var cover = $('.active').find('.cover').attr('src');
      var title = $('.active').find('.title').text();
      var author = $('.active').find('.author').text();
      var long_desc = $('.active').find('.long_desc').attr('data');


      $('#content').attr('data',_id);
      $('#content').append('<img class="large_cover" src='+cover+'>')
      $('#content').append('<div class="title">'+title+'</div')
      $('#content').append('<div class="author">'+author+'</div')
      $('#content').append('<div class="long_desc">Long Description:'+long_desc+'</div')
      $('#content').append('<button class="add_to_cart">Add to Cart</button></div>');

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
    $(document).on('click','.book',function() {
      $(this).addClass('active');
		  modal.open({ content: '' });
    });
    $(document).on('click','.add_to_cart',function() {
      console.log($(this).parent().attr('data'));
    });
  });
});