// Append HTML for bookshelves
function Shelve(bookshelf,current,filter,search) {
  $('.loading').show();
  $.each(bookshelf.slice(current), function (key, data) {
    if ( key < 50 ) {
      // Append books if filter is set to All
      if ( filter == 'All' && ( data.title.indexOf(search) != -1) ) { 
        Render(data); 
      }
      // Append books if filter is set to other category
      else if (data.genre == filter && ( data.title.indexOf(search) != -1) ) {
        Render(data);
      }
    } 
    // Break .each if range is greater than 50
    else { return false; }
  });
  $('.loading').hide();
  return current+50;
}

// Create nodes and append to #bookshelf
function Render(data) {
  var book = $('<div class="book">'+
    '<div class="id">'+data._id+'</div>'+
    '<div class="cover" src='+data.cover+'></div>'+
    '<div class="title">'+data.title+'</div>'+
    '<div class="author">by '+data.author+'</div>'+
    '<div class="short_desc">'+data.short_desc+'</div>'+
    '<div class="long_desc">'+data.long_desc+'</div>'+
    '<div class="genre">'+data.genre+'</div>'+
    '<button class="add_to_cart"><span>Add to Cart </span></button>'+
    '</div>');
  book.css({ 'background' : 'url('+data.cover+')', 'background-size' : '100%' });
  $('#bookshelf').detach().append(book).appendTo($('.wrapper'));
}