function requireAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.replace('index.html');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
