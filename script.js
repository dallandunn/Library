// Library Class
class library {
    constructor() {
        this.books = [];
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => {
            if (button.id === 'add') {
                button.onclick = () => {
                    this.getBook()
                }
            }

            if (button.id === 'cancel' || button.id === 'add-book') {
                button.onclick = () => {
                    this.toggleForm();
                }
            }
        });
    }

    addBook(Book) {
        this.books.push(Book);
        this.show();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.show();
    }

    getBook() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const num_pages = document.getElementById('pages').value;
        const read = document.getElementById('popup-read').checked;
        const newBook = new Book(title, author, num_pages, read);
        this.toggleForm();
        this.addBook(newBook);
    }

    toggleForm() {
        const form = document.getElementById("form");
        const mask = document.getElementById("page-mask");
        if (form.style.display === "block"){
            form.style.display = "none";
            mask.style.display = "none";
        } else {
            form.style.display = "block";
            mask.style.display = "block";
        }
    }

    show() {
        this.books.forEach((book, index) => {
            const title = document.getElementById(index);
            if (!title) {
                const card = new BookCard(book, index);
                card.createCard();
            }
        });

        const removeButtons = document.querySelectorAll('.delete-book');
        removeButtons.forEach((button) => {
            button.onclick = () => {
                this.removeBook(button.parentElement.id);
                button.parentElement.remove();
            }
        });
    }
}

// Book Class
class Book {
    constructor(title, author, num_pages, haveRead) {
        this.title = title;
        this.author = author;
        this.num_pages = num_pages;
        this.haveRead = haveRead;
    }

    get haveRead() {
        return this._haveRead;
    }

    set haveRead(value) {
        this._haveRead = value;
    }

    toggleRead() {
        if (this.haveRead) {
            this.haveRead = false;
        } else {
            this.haveRead = true;
        }
    }

    get info() {
        return "<h2>" + this.title + "</h2> <p>by " + this.author + "</p><p>" + this.num_pages + " pages</p>";
    }
}

// Card Container Class
class BookCard {
    constructor(Book, index) {
        this.Book = Book;
        this.libraryDiv = document.getElementById('library');
        const card = document.createElement('div')
        card.setAttribute('class', 'book card');
        card.setAttribute('id', index);
        this.card = card;
        this.index = index;
    }
    
    createInfo() {
        const bookInfo = document.createElement('div');
        bookInfo.innerHTML = this.Book.info;
        bookInfo.setAttribute('class', 'info');
        bookInfo.setAttribute('id', this.Book.id);
        this.card.appendChild(bookInfo);
    }

    createRemoveButton() {
        const remove = document.createElement('button');
        remove.setAttribute('class', 'delete-book');
        remove.setAttribute('id', 'remove-button');
        this.card.appendChild(remove);
    }

    createToggle() {
        const container = document.createElement('div');
        const read = document.createElement('input');
        const label = document.createElement('label');
        const text = document.createElement('p');

        container.setAttribute('class', 'switch-container');

        read.type = 'checkbox';
        read.checked = this.Book.haveRead;
        read.id = 'read' + this.index;
        read.onchange = () => {
            this.Book.toggleRead();
        }

        label.htmlFor = read.id;
        label.setAttribute('class', 'toggle');

        text.innerText = 'Read?';

        container.appendChild(read);
        container.appendChild(label);
        container.appendChild(text);
        this.card.appendChild(container);
    }

    createCard() {
        this.createInfo();
        this.createRemoveButton();
        this.createToggle();
        
        this.libraryDiv.appendChild(this.card);
    }
}

let myLibrary = new library();
let AGoT = new Book('A Game of Thrones', 'George R.R. Martin', 694, true);
let theBigShort = new Book('The Big Short', 'Michael Lewis', 320, true);
myLibrary.addBook(AGoT);
myLibrary.addBook(theBigShort);
myLibrary.show();