//Async Function to call the related route for the realtive Restend point for Adding New Post
async function fnCreateReviewAction(event) {
    event.preventDefault();

    document.location.replace('/api/reviews/new')
}
//Button Event Listner
document.querySelector('#btnNewReview').addEventListener('click', fnCreateReviewAction);