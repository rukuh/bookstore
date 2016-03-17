$(function() {
  // Render bookshelves in ajax callback due to asynchonous request
  $.ajax( 'bookshelf.json' )
    .done( function(responseJSON) {
      // Initial load books
      var current = Shelve(responseJSON,0,$('#filter').val(),$('#search').val());

      // Load books on scroll
      $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          current = Shelve(responseJSON,current,$('#filter').val(),$('#search').val());
        }
      });

      // Load books on category select
      $("#filter").change(function() {
        $('#bookshelf').empty();
        current = Shelve(responseJSON,0,$('#filter').val(),$('#search').val());

        // Load books if there are less than enough to trigger scroll
        while( ($(window).height() >= $(document).height() || $('.book').length < 50 ) && current < responseJSON.length ){
          current = Shelve(responseJSON,current,$('#filter').val(),$('#search').val());
        };
      });

      // Load books on search
      $('#search').on('input propertychange paste', function(event) {
        // Prevent multiple search requests while user is typing
        delay(function(){
          $('#bookshelf').empty();
          current = Shelve(responseJSON,0,$('#filter').val(),$('#search').val());

          // Load books if there are less than enough to trigger scroll
          while( ($(window).height() >= $(document).height() || $('.book').length < 50 ) && current < responseJSON.length ){
            current = Shelve(responseJSON,current,$('#filter').val(),$('#search').val());
          };
        }, 500);
      });
    });
});