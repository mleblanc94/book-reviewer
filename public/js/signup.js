async function fnUserSignup(event) {
    event.preventDefault();

    const username = document.querySelector('#txtboxNameSignUp').value.trim();
    const useremail = document.querySelector('#txtboxEmailSignUp').value.trim();
    const password = document.querySelector('#txtboxPwdSignUp').value.trim();

    if (username && password) {
        const response = await fetch('/api/signup', {
            method: 'post',
            body: JSON.stringify({
                username,
                useremail,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) document.location.replace('/dashboard');
        else alert(response.statusText);
    }
}

document.querySelector('#frmSignUp').addEventListener('submit', fnUserSignup);