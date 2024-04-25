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

const myLibrary = [];
const harryPotter = new Book("Harry Potter", "JK Rowling", 250, 'true')
myLibrary.push(harryPotter)
booksEntered()

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


function readStatus() {
  const index = this.getAttribute('data-index');
  myLibrary[index].read = !myLibrary[index].read;
  booksEntered();
}

function booksEntered() {
  let libraryTable = document.querySelector('tbody');
  libraryTable.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookRow = document.createElement('tr');
    bookRow.className = 'book-row'
    bookRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button class="read-status ${book.read ? 'read' : 'not-read'}" data-index="${i}">${book.read ? "Read" : "Not Read Yet"}</button></td>
        <td><button class="delete-button" data-index="${i}">Delete</button></td>`;
    libraryTable.append(bookRow);
  }

  const readBtns = document.querySelectorAll('.read-status');
  readBtns.forEach(button => {
    button.addEventListener('click', readStatus)
  })

  const deleteBtns = document.querySelectorAll('.delete-button');
  deleteBtns.forEach(button => {
    button.addEventListener('click', function () {
      //use event.currentTarget.getAttribute to prevent bubbling,
      //this.getAttribute works here because there isn't any nested events
      const index = this.getAttribute('data-index');
      myLibrary.splice(index, 1);
      booksEntered();
    })
  })

}


function addBookToLibrary() {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('input[name=read]:checked').value === 'true';

  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  booksEntered();
  form.reset();
  modal.close();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addBookToLibrary();
})




// class Book {
//   constructor(title, author, pages, read) {
//     const addBook = document.querySelector('.add-btn');
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.read = read

//     addBook.addEventListener("click", this.userInput.bind(this))
//   }
//   userInput(e) {
//     this.title = document.querySelector('#title').value;
//     this.author = document.querySelector('#author').value
//     this.pages = document.querySelector('#pages').value
//     this.read = document.querySelector('input[name=read]:checked').value

//     console.log(this.title, this.author, this.pages, this.read)
//   }
//   info() {
//     return `${this.title}  ${this.author}, ${this.pages}, ${this.read}`
//   }
// }
// const book = new Book();

// function addBookToLibrary(book) {
//   myLibrary.push(book);
// }



