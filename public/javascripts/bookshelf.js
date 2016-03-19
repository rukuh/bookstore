// Append HTML for bookshelves
function Shelve(bookshelf,current,filter,search,load) {
  $('#loading').show();
  $.each(bookshelf.slice(current), function (key, data) {
    if ( key < load ) {
      // Append books if filter is set to All
      if ( filter == 'Category' && ( data.title.toLowerCase().indexOf(search) != -1) ) { 
        Render(data); 
      }
      // Append books if filter is set to other category
      else if (data.genre == filter && ( data.title.toLowerCase().indexOf(search) != -1) ) {
        Render(data);
      }
    } 
    // Break .each if range is greater than 50
    else { return false; }
  });
  console.log('hide loading');
  $('#loading').hide();
  return current+load;
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
  //book.css({ 'background' : 'url('+data.cover+')', 'background-size' : '100%' });
  $('#bookshelf').detach().append(book).appendTo($('.wrapper'));
}