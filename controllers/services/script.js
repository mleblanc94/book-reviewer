// API URL and Keys
var apiURL = 'https://www.googleapis.com/books/v1/volumes?q='
var API_Key = process.env.API_KEY;

class Book {
    constructor(tite, author, thumbnail){
        this.title= title;
        this.author = author;
        this.description = description; 
        this.thumbnail = thumbnail;
    }
}

// API search string
var bookURL = 'https://www.googleapis.com/books/v1/volumes?q=' + search + intitle + "&key=" + API_Key;
fetch(bookURL)

// Message if API doesn't pull book
.then(function (response) {
    if (response.status !== 200) {
        throw Error("Book not found");
    }
    return response.json();
});




