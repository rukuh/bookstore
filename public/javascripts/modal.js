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
    $('.wrapper').append($overlay, $modal);
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

    $modal.fadeIn();
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