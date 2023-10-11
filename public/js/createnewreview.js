//Async Function to call the related route for the realtive Rest-end point for Adding New Review
async function fnCreateNewReview(event) {
    event.preventDefault();
    //Get Values from HTML
    const book_name = document.querySelector('#book_name').value.trim();
    const author_name = document.querySelector('#author_name').value.trim();
    const book_cover = document.querySelector('#book_cover').value.trim();
    const description = document.querySelector('#description').value.trim();
    const rating = document.querySelector('#postTitle').value.trim();
    const reviewContent = document.querySelector('#postText').value.trim();

    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            book_name,
            author_name,
            book_cover,
            description,
            rating,
            reviewContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');//Call the handler
    } else {
        alert(response.statusText);//Error
    }
}
//Button Event Listner
document.querySelector('#frmCreateReview').addEventListener('submit', fnCreateNewReview);