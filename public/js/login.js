async function fnUserLogin(event) {
  event.preventDefault();

  const strUserName = document.querySelector('#txtboxLoginUsername').value.trim();
  const strPassWord = document.querySelector('#txtboxLoginPwd').value.trim();

  if (strUserName && strPassWord) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ strUserName, strPassWord }) // matches your server keys
    });

    if (response.ok) {
      localStorage.removeItem('role');            // clear any guest flag
      sessionStorage.removeItem('role');
      document.location.replace('/');
    } else {
      const msg = (await response.json().catch(() => null))?.message || response.statusText;
      alert(msg);
    }
  } else {
    alert('Please enter both email and password.');
  }
}
document.querySelector('#frmLogin').addEventListener('submit', fnUserLogin);

// --- Continue as Guest ---
document.querySelector('#btnGuestLogin')?.addEventListener('click', async () => {
  try {
    const r = await fetch('/api/users/guest', { method: 'POST' }); // add this route server-side
    if (!r.ok) throw new Error('Guest login failed');
    localStorage.setItem('role', 'guest');        // optional, for UI hints
    sessionStorage.setItem('role', 'guest');
    document.location.replace('/');
  } catch (e) {
    alert('Unable to continue as guest right now.');
  }
});
