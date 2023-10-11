//Async Function to call the related route for the realtive Restend point for Deleting a Review
async function fnDeleteReview(event) {
    event.preventDefault();
    //Get the related Review Id from URL Object
    const postIid = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/reviews/${postIid}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');//Call the 
    } else {
        alert(response.statusText);
    }
}
//Button Event Listner
document.querySelector('#btnDeleteReview').addEventListener('click', fnDeleteReview);