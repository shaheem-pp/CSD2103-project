document.getElementById('showPassword').addEventListener('change', function() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = this.checked ? 'text' : 'password';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                // Simulate session by saving the user ID
                localStorage.setItem('userID', user.id);
                window.location.href = 'index.html'; // Redirect to homepage
            } else {
                alert('Invalid credentials');
            }
        });
});
