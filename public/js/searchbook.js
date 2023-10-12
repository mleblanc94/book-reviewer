
function searchBooks() {
    
    const searchInput = document.getElementById('search').value;
    const searchResults = document.getElementById('search-results');

    // Clear previous results
    searchResults.innerHTML = '';

    // Make a request to Google Books API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const books = data.items;

            // Display each book in the search results
            books.forEach(book => {
                const title = book.volumeInfo.title;
                const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Authors';

                const resultDiv = document.createElement('div');
                resultDiv.textContent = `${title} by ${authors}`;
                resultDiv.addEventListener('click', () => selectBook(book));
                searchResults.appendChild(resultDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function selectBook(book) {
    const selectedBook = document.getElementById('selected-book');
    const bookTitle = document.getElementById('book-title');
    const bookAuthors = document.getElementById('book-authors');
    const bookCover = document.getElementById('book-cover');
    const bookCoverValue = document.getElementById('book-cover-val');
    const bookDescription = document.getElementById('book-description');
    const searchResults = document.getElementById('search-results');
    const searchInput = document.getElementById('search').value;

    // Clear search results
    searchResults.innerHTML = '';
    searchInput.value = '';

    // Display details of the selected book
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Authors';
    const description = book.volumeInfo.description || 'No description available';
    const coverLink = book.volumeInfo.imageLinks?.thumbnail || ''; // Check if imageLinks is available

    //bookTitle.textContent = title;
    //bookAuthors.textContent = `By: ${authors}`;
    bookTitle.value=title;
    bookAuthors.value=authors;
    bookCover.src = coverLink;
    bookCoverValue.value=coverLink;
    bookDescription.textContent = description;
}
