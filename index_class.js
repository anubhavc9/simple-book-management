console.log("This is ES6 classes version, with all further improvements");

/* Further improvements:
    1. store all the data to local storage
    2. give an option to delete a book.
    3. add a scroll bar to the page 
    4. add a background image
    5. change text color etc in a separate CSS file
*/

class Book{
    constructor(name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{
    // function to add a book to the DOM
    add(book) {
        let tableBody = document.getElementById('tableBody'); // grabbing the table to populate

        index++; // index is the global variable that keeps track of serial number of the books
        let uiString = `<tr>
                            <td>${index}</td>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                            <td><button type="button" id=${index} onclick="deleteBook(this.id)" class="btn btn-danger" style="font-size: 12px;">Delete</button></td>
                        </tr>`;

        tableBody.innerHTML += uiString;
    }

    // function to clear input form values after submission
    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset(); // resets the form after submission
    }

    validate(book){
        if(book.name.length < 2 || book.author.length < 2)
            return false;
        else
            return true;
    }

    show(alert_type, alert_message){
        let message = document.getElementById('message');
        let boldText;
        if(alert_type === 'success')
            boldText = 'Success';
        else
            boldText = 'Error!';
            
        message.innerHTML = `<div class="alert alert-${alert_type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}</strong> ${alert_message}
                                <button type="button" id=${index} onclick="deleteBook(this.id)" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;

        // remove the alert after 5 seconds
        setTimeout(() => {
            message.innerHTML = ``;
        }, 5000);
    }
}


// Adding a submit event listener on the form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
    // getting values from the input tags
    let bookName = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    
    // getting values from the radio buttons
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
    console.log("Newly created book object: ");
    console.log(book);
    
    let display = new Display();
    
    // if the book object is valid, append it to the existing localStorage
    if(display.validate(book))
    {
        let library = localStorage.getItem("library");

        if (library == null) {
            libraryObj = [];
        } else {
            libraryObj = JSON.parse(library);
        }

        let myObj = {
            name: book.name,
            author: book.author,
            type: book.type
        }

        libraryObj.push(myObj);

        localStorage.setItem("library",JSON.stringify(libraryObj));
    }
    
    // add the following functions to the Display class: validate(), add(), clear(), show()
    // if the book object is valid, populate the tableBody with it
    if(display.validate(book)){
        display.add(book); // add the book object to the table
        display.clear(); // reset the input form
        display.show('success','Your book has been successfully added.'); // show success/error alert
    }
    else
        display.show('danger','Book name & author must be atleast 2 characters long.'); // show error to the user

    e.preventDefault(); // to stop the page from reloading on form submission
}

// global variable "index" keeps track of the serial number of books
let index = 0;

// to display the already existing files in the localStorage as soon as the page loads
let library = localStorage.getItem("library");

if (library == null) {
    libraryObj = [];
} else {
    libraryObj = JSON.parse(library); // converting the "library" string into an array
}

let html = "";
libraryObj.forEach(function (element) {
    index++;
    html += `<tr>
                <td>${index}</td>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><button type="button" id=${index} onclick="deleteBook(this.id)" class="btn btn-danger" style="font-size: 12px;">Delete</button></td>
            </tr>`;
});

let tableBody = document.getElementById('tableBody'); // grab the tableBody to insert data

if (libraryObj.length != 0) {
    tableBody.innerHTML = html;
} else {
    table.innerHTML = `<h3>No books added yet</h3>`;
}


// Function to delete a book
function deleteBook(deleteId) {
    // deleteId is the id of the delete button that was clicked
    
    index = 0; // reset the global index variable to 0 as we're repopulating the enitre table again from scratch
    
    let library = localStorage.getItem("library");

    if (library == null) {
        libraryObj = [];
    } else {
        libraryObj = JSON.parse(library);
    }

    libraryObj.splice(deleteId-1, 1);
    localStorage.setItem("library", JSON.stringify(libraryObj));

    let html = "";
    libraryObj.forEach(function (element) {
        index++;
        html += `<tr>
                    <td>${index}</td>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button type="button" id=${index} onclick="deleteBook(this.id)" class="btn btn-danger" style="font-size: 12px;">Delete</button></td>
                </tr>`;
    });

    let tableBody = document.getElementById('tableBody'); // grab the tableBody to insert data

    if (libraryObj.length != 0) {
        tableBody.innerHTML = html;
    } else {
        table.innerHTML = `<h3>No books added yet</h3>`;
    }
}