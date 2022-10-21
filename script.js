let AGoT = new Book("A Game of Thrones", "George R. R. Martin", 694, true);
let theBigShort = new Book("The Big Short", "Michael Lewis", 320, true);
let myLibrary = [AGoT, theBigShort];

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
}

Book.prototype.info = function() {
    return "<h2>" + this.title + "</h2> <p>by " + this.author + "</p><p>" + this.num_pages + " pages</p>";
}

function addBookToLibrary(title, author, num_pages, read) {
    const newBook = new Book(title, author, num_pages, read);
    myLibrary.push(newBook);
}   

function removeBookFromLibrary(bookToRemove) {
    myLibrary.splice(bookToRemove, 1);
}

function displayBooks(Books) {
    Books.forEach(book => {
        const card = document.createElement('div');
        const bookInfo = document.createElement('div')
        bookInfo.innerHTML = book.info();
        bookInfo.setAttribute('class', 'info');
        card.setAttribute('class', 'book card');
        card.appendChild(bookInfo);
        document.getElementById('library').appendChild(card);
    });
}

displayBooks(myLibrary);
