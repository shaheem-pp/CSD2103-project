
document.getElementById('showPassword').addEventListener('change', function () {
    const passwordInput = document.getElementById('password');
    passwordInput.type = this.checked ? 'text' : 'password';
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (phone.length !== 10 || isNaN(phone)) {
        alert('Phone number must be 10 digits');
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Invalid email address');
        return;
    }

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            if (users.some(user => user.email === email)) {
                alert('Email already exists');
                return;
            }

            const newUser = {
                id: Date.now(), // Simple user ID using timestamp
                name: name,
                phone: phone,
                email: email,
                password: password
            };

            users.push(newUser);
            localStorage.setItem('userID', newUser.id); // Simulate session

            // Save updated users list to users.json
            fetch('users.json', {
                method: 'POST',
                body: JSON.stringify(users),
                headers: { 'Content-Type': 'application/json' }
            });

            window.location.href = 'index.html'; // Redirect to homepage
        });
});
