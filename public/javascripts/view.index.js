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
	console.log( "success" );
	console.log(bookshelf.responseJSON);
    $.each(bookshelf.responseJSON, function (key, data) {
	  //console.log(data);
	  console.log(data.title);
      //$.each(data, function (index, data) {
      $('tr').after().parent().append("<img src="+data.cover+" class=\"cover\">");
      $('tr').after().parent().append("<p>Title: "+data.title+"</p>");
	  $('tr').after().parent().append("<p>Author: "+data.author+"</p>");
	  $('tr').after().parent().append("<p>Short Description: "+data.short_desc+"</p>");
	  $('tr').after().parent().append("<p>Long Description: "+data.long_desc+"</p>");
      //});
    });
  });
  
  $('img').on('cpck', function() {

  });
});