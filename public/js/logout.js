//Async Function to call the related route for the realtive Restend point for User Logout
async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}
//Button Event Listner
document.querySelector('#logout').addEventListener('click', logout);