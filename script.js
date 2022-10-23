let AGoT = new Book("A Game of Thrones", "George R. R. Martin", 694, true);
let theBigShort = new Book("The Big Short", "Michael Lewis", 320, true);
let myLibrary = [AGoT, theBigShort];

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
    this.id = title.split(' ').join('-');
}

Book.prototype.info = function() {
    return "<h2>" + this.title + "</h2> <p>by " + this.author + "</p><p>" + this.num_pages + " pages</p>";
}

Book.prototype.appendReadToggle = function(parentElement, index) {
    const container = document.createElement('div');
    const read = document.createElement('input');
    const label = document.createElement('label');
    const text = document.createElement('p');

    container.setAttribute('class', 'switch-container');

    read.type = 'checkbox';
    read.checked = this.read;
    read.id = 'read' + index;
    read.onchange = toggleRead;

    label.htmlFor = read.id;
    label.setAttribute('class', 'toggle');

    text.innerText = 'Read?';

    container.appendChild(read);
    container.appendChild(label);
    container.appendChild(text);
    parentElement.appendChild(container);

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

function toggleRead() {
    const bookToChange = this.parentElement;
    myLibrary[bookToChange.id].read = this.checked;
}

function displayBooks(Books) {
    Books.forEach(function(book, index) {
        const title = document.getElementById(book.id);
        if (!title) {
            const card = document.createElement('div');
            const bookInfo = document.createElement('div');
            const remove = document.createElement('button');
            remove.setAttribute('class', 'delete-book');
            remove.setAttribute('id', 'remove-button');
            remove.onclick = removeBookFromLibrary;
            bookInfo.innerHTML = book.info();
            bookInfo.setAttribute('class', 'info');
            bookInfo.setAttribute('id', book.id);
            card.setAttribute('class', 'book card');
            card.setAttribute('id', index);
            card.appendChild(bookInfo);
            card.appendChild(remove);
            book.appendReadToggle(card, index);
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