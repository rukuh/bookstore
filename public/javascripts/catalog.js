// Append HTML for bookshelves
function Shelve(bookshelf) {
  $('.loader').show();
  $.each(bookshelf, function (key, data) {
      Render(data);
  });
  $('.loader').hide();
}

// Create nodes and append to #bookshelf
function Render(data) {
  var book = $('<div class="book">'+
    '<div class="id">'+data._id+'</div>'+
    '<img class="cover" src='+data.cover+'>'+
    '<div class="title">'+data.title+'</div>'+
    '<div class="author">by '+data.author+'</div>'+
    '<div class="short_desc">'+data.short_desc+'</div>'+
    '<div class="long_desc">'+data.long_desc+'</div>'+
    '<div class="genre">'+data.genre+'</div>'+
    '<button class="add_to_cart icon-basket"></button>'+
    '</div>');
  $('#bookshelf').detach().append(book).appendTo($('.wrapper'));
}