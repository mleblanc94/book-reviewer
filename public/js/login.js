async function fnUserLogin(event) {
    event.preventDefault();    
    const strUserName = document.querySelector('#txtboxLoginUsername').value.trim();
    const strPassWord = document.querySelector('#txtboxLoginPwd').value.trim();

    if (strUserName && strUserName) {        
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({ strUserName, strPassWord }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) document.location.replace('/');
        else alert(response.statusText);        
    }
}
document.querySelector('#frmLogin').addEventListener('submit', fnUserLogin);

