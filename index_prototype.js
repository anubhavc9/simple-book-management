console.log("This is Library Website - Prototype Version");

/* Further improvements:
    1. store all the data to local storage
    2. give an option to delete a book
    3. add a scroll bar to the page */

// Constructor
function Book(name, author, type){
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor. We will add some methods to its prototype that will be responsible for displaying books.
function Display(){

}

// Add methods to display prototype
Display.prototype.add = function(book){
    let tableBody = document.getElementById('tableBody'); // grabbing the table to populate
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;

    tableBody.innerHTML += uiString;
}

Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset(); // resets the form after submission
}

// function to validate the form input
Display.prototype.validate = function(book){
    if(book.name.length < 2 || book.author.length < 2){
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show = function(alert_type, alert_message){
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${alert_type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${alert_message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

    setTimeout(() => {
        message.innerHTML = ``;
    }, 5000);
}

// Adding a submit event listener on the form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){

    let bookName = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    
    if(fiction.checked){
        type = fiction.value;
    }
    else if(programming.checked){
        type = programming.value;
    }
    else{
        type = cooking.value;
    }

    let book = new Book(bookName, author, type);
    console.log(book);
    
    let display = new Display();
    
    // add the following functions to the Display prototype
    
    if(display.validate(book)){
        display.add(book); // add a book to the DOM
        display.clear(); // clear input form values
        display.show('success','Your book has been successfully added.');
    }
    else{
        display.show('danger','Sorry, you cannot add this book.'); // show error to the user
    }

    e.preventDefault(); // to stop the page from reloading on form submission
}