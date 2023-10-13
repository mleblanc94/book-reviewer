//Async Function to call the related route for the realtive Rest-end point for Adding New Review
async function fnCreateNewReview(event) {
    event.preventDefault();
    //Get Values from HTML
    const book_name = document.querySelector('#book-title').value.trim();
    const author_name = document.querySelector('#book-authors').value.trim();
    const book_cover = document.getElementById("book-cover-val").value;       
    const book_description = document.querySelector('#book-description').value;    
    const reviewContent = document.querySelector('#reviewText').value.trim();
    const rating = document.querySelector('#ratingValue').textContent;
    const response = await fetch(`/api/reviews/add`, {
        method: 'POST',
        body: JSON.stringify({
            book_name,
            author_name,
            book_cover,
            book_description,
            rating,
            reviewContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');//Call the handler
    } else {
        alert(response.statusText);//Error
    }
}

function ratingslider(){    
    const ratingSlider = document.querySelector('#ratingSlider');
    const ratingValue = document.querySelector('#ratingValue');
    const rating = ratingSlider.value;
    ratingValue.textContent = `${rating}`;    
}

//Button Event Listner
document.querySelector('#frmCreateReview').addEventListener('submit', fnCreateNewReview);
document.getElementById('ratingSlider').addEventListener('input', ratingslider);