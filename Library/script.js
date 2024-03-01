const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")
const dialog = document.querySelector(".modal")
const form = document.querySelector('.modal-form')

openButton.addEventListener("click", () => {
  modal.showModal()
})

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  modal.close();
})

dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})

// const myLibrary = [];
// const harryPotter = new Book("Harry Potter", "JK Rowling", 250, 'true')
// myLibrary.push(harryPotter)
// booksEntered()

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1)
  }

  readStatus(index) {
    this.books[index].read = !this.books[index].read;
  }

  render() {
    const libraryTable = document.querySelector('tbody');

    libraryTable.innerHTML = '';
    this.books.forEach((book, index) => {
      const bookRow = document.createElement('tr');
      bookRow.className = 'book-row';
      bookRow.innerHTML = `
      <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button class="read-status ${book.read ? 'read' : 'not-read'}" data-index="${index}">${book.read ? "Read" : "Not Read Yet"}</button></td>
        <td><button class="delete-button" data-index="${index}">Delete</button></td>`;
      libraryTable.appendChild(bookRow);
    })

    const readBtns = document.querySelectorAll('.read-status');
    readBtns.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        myLibrary.readStatus(index);
        myLibrary.render()
      })
    })

    const deleteBtns = document.querySelectorAll('.delete-button');
    deleteBtns.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        myLibrary.removeBook(index);
        myLibrary.render();
      })

    })
  }

}

let myLibrary = new Library();
// function readStatus() {
//   const index = this.getAttribute('data-index');
//   myLibrary[index].read = !myLibrary[index].read;
//   booksEntered();
// }

function addBookToLibrary() {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('input[name=read]:checked').value === 'true';

  let book = new Book(title, author, pages, read);
  myLibrary.addBook(book);
  myLibrary.render();
  form.reset();
  modal.close();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addBookToLibrary();
})

// function booksEntered() {
//   let libraryTable = document.querySelector('tbody');
//   libraryTable.innerHTML = '';
//   for (let i = 0; i < myLibrary.length; i++) {
//     let book = myLibrary[i];
//     let bookRow = document.createElement('tr');
//     bookRow.className = 'book-row'
//     bookRow.innerHTML = `
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.pages}</td>
//         <td><button class="read-status ${book.read ? 'read' : 'not-read'}" data-index="${i}">${book.read ? "Read" : "Not Read Yet"}</button></td>
//         <td><button class="delete-button" data-index="${i}">Delete</button></td>`;
//     libraryTable.append(bookRow);
//   }

//   const readBtns = document.querySelectorAll('.read-status');
//   readBtns.forEach(button => {
//     button.addEventListener('click', readStatus)
//   })

//   const deleteBtns = document.querySelectorAll('.delete-button');
//   deleteBtns.forEach(button => {
//     button.addEventListener('click', function () {
//       const index = this.getAttribute('data-index');
//       myLibrary.splice(index, 1);
//       booksEntered();
//     })
//   })

// }
