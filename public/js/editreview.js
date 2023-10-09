//Async Function to call the related route for the realtive Restend point for Editing Review
async function fnEditPost(event) {
    event.preventDefault();

    //Get Values from HTML
    const book_name = document.querySelector('#book_name').value.trim();
    const author_name = document.querySelector('#author_name').value.trim();
    const book_cover = document.querySelector('#book_cover').value.trim();
    const description = document.querySelector('#description').value.trim();
    const rating = document.querySelector('#postTitle').value.trim();
    const reviewContent = document.querySelector('#postText').value.trim();

    //Get the related Post Id from URL Object
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
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
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
//Button Event Listner
document.querySelector('#frmUpdatePost').addEventListener('submit', fnEditPost);