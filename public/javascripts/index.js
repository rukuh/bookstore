$(function() {
  var current = 0;
  var url = '/books';
  // Render bookshelves in ajax callback due to asynchonous request
  current = request(url,$('#filter').val(),$('#search').val(),current);

  // Load books on scroll
  $(window).scroll(function() {
    if( $(window).scrollTop() + $(window).height() > $(document).height() - 100 ) {
      current = request(url,$('#filter').val(),$('#search').val(),current);
    }
  });

  // Load books on category select
  $("#filter").change(function() {
    $('#bookshelf').empty();
    current = 0;
    current = request(url,$('#filter').val(),$('#search').val(),current);
  });

  // Load books on search
  $('#search').on('input propertychange paste', function(event) {
    // Prevent multiple search requests while user is typing
    delay(function(){
      $('#bookshelf').empty();
      current = 0;
      current = request(url,$('#filter').val(),$('#search').val(),current);
    }, 500);
  });

});

function request(url,category,search,current) {
  // Render bookshelves in ajax callback due to asynchonous request
    $.ajax( url + '/' + current + '?' + 'category=' + category + '&' + 'search=' + search)
    .done( function(responseJSON) {
      // Initial load books
      Shelve(responseJSON);
    });
    return current+30;
}