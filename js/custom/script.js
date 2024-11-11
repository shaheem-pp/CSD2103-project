window.onload = function() {
    const userID = localStorage.getItem('userID');
    
    if (!userID) {
        window.location.href = 'login.html'; // Redirect to login if no session
    } else {
        // Load user-specific data
        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.id == userID);
                if (user) {
                    document.getElementById('userName').textContent = `Welcome, ${user.name}`;
                }
            });
    }
};

// Logout functionality
function logout() {
    localStorage.removeItem('userID');
    window.location.href = 'login.html'; // Redirect to login page
}
