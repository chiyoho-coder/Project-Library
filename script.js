const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID(); // create a unique and stable ID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// switch to read mode
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks(); // update the interface after adding
}

function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = '';

    myLibrary.forEach(book => {

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.setAttribute('data-id', book.id)

        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p class="status">
            <strong>Status:</strong>
            ${book.read ? 'read' : 'unread'}
        </p>
        <div class="card-buttons">

            <button class="toggle-read-btn">
                ${book.read ? 'mark as unread' : 'mark as read'}
            </button>

            <button class="remove-btn">Delete</button>
        </div>
    `;

    bookCard.querySelector('.remove-btn').addEventListener('click', () => {
        removeBookFromLibrary(book.id);
    });

    bookCard.querySelector('.toggle-read-btn').addEventListener('click', () => {
        book.toggleReadStatus();
        displayBooks();
    });

    libraryContainer.appendChild(bookCard);

    });

}

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
}

const bookDialog = document.getElementById('book-dialog');
const newBookBtn = document.getElementById('new-book-btn');
const closeDialogBtn = document.getElementById('close-dialog-btn');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => {
    bookForm.reset();
    bookDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    bookDialog.close();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    bookDialog.close();
});

addBookToLibrary('Lão Hạc', 'Nam Cao', 50, true);
addBookToLibrary('Số Đỏ', 'Vũ Trọng Phụng', 220, false);