ifUserInSession("index.html");

$(document).ready(function () {
	function getStoredUsers() {
		const users = localStorage.getItem("users");
		return users ? JSON.parse(users) : [];
	}

	function validateLogin(email, password) {
		const users = getStoredUsers();
		const user = users.find(user => user.username === email && user.password === password);
		return user ? user.id : null;
	}

	$('#loginForm').on('submit', function (e) {
		e.preventDefault();

		const email = $('#email').val().trim();
		const password = $('#password').val().trim();

		const userId = validateLogin(email, password);

		if (userId) {
			sessionStorage.setItem("userId", userId);
			alert("Login successful!");
			window.location.href = "index.html";
		} else {
			alert("Invalid email or password. Please try again.");
		}
	});

	$('#showPassword').on('change', function () {
		let passwordField = $('#password');
		passwordField.attr('type', $(this).is(':checked') ? 'text' : 'password');
	});
});