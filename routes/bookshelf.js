exports.bookshelf = function(cover, title, author, description)
{
    this.cover = cover;
    this.title = title;
    this.author = author;
	this.description = description;

    this.cart;

    this.setCart = function(cart)
    {
        this.cart = cart;
    }

    this.getCover = function()
    {
        return this.cover;
    }

    this.getTitle = function()
    {
        return this.title;
    }

    this.getAuthor = function()
    {
        return this.author;
    }
	
	this.getDescription = function()
    {
        return this.description;
    }
}