async function fnUserSignup(event) {
    event.preventDefault();

    const name = document.querySelector('#txtboxNameSignUp').value.trim();
    const useremail = document.querySelector('#txtboxEmailSignUp').value.trim();
    const password = document.querySelector('#txtboxPwdSignUp').value.trim();
    
    if (useremail && password) {
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                name,
                useremail,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) document.location.replace('/');
        else alert(response.statusText);
    }
}

document.querySelector('#frmSignUp').addEventListener('submit', fnUserSignup);