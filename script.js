let AGoT = new Book("A Game of Thrones", "George R. R. Martin", 694, true);
let theBigShort = new Book("The Big Short", "Michael Lewis", 320, true);
let myLibrary = [AGoT, theBigShort];

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
    this.id = title.split(' ').join('-')
}

Book.prototype.info = function() {
    return "<h2>" + this.title + "</h2> <p>by " + this.author + "</p><p>" + this.num_pages + " pages</p> <p>Read?</p>";
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const num_pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const newBook = new Book(title, author, num_pages, read);
    myLibrary.push(newBook);
    toggleShowForm();
    displayBooks(myLibrary);
}

function removeBookFromLibrary() {
    const bookToRemove = this.parentElement;
    myLibrary.splice(bookToRemove.id, 1);
    bookToRemove.remove();
    displayBooks(myLibrary);
}

function displayBooks(Books) {
    Books.forEach(function(book, index) {
        const title = document.getElementById(book.id);
        if (!title) {
            const card = document.createElement('div');
            const bookInfo = document.createElement('div')
            const read = document.createElement('input')
            const remove = document.createElement('button');
            remove.setAttribute('class', 'delete-book');
            remove.innerText = 'remove'
            remove.setAttribute('id', 'remove-button' + index);
            remove.onclick = removeBookFromLibrary;
            read.type = 'checkbox';
            read.checked = book.read;
            bookInfo.innerHTML = book.info();
            bookInfo.setAttribute('class', 'info');
            bookInfo.setAttribute('id', book.id);
            card.setAttribute('class', 'book card');
            card.setAttribute('id', index);
            card.appendChild(bookInfo);
            card.appendChild(read);
            card.appendChild(remove);
            document.getElementById('library').appendChild(card);
        }
    });
}

function toggleShowForm() {
    if (document.getElementById("form").style.display === "block"){
        document.getElementById("form").style.display = "none";
        document.getElementById("page-mask").style.display = "none";
    } else {
        document.getElementById("form").style.display = "block";
        document.getElementById("page-mask").style.display = "block";
    }
}

displayBooks(myLibrary);
// document.getElementById('add-book').addEventListener('click', function() {console.log("clicked!")})