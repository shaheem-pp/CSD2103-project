$(document).ready(function () {
	function getCurrentTimestamp() {
		let current = new Date();
		let date = current.toLocaleDateString("en-CA");
		let time = current.toLocaleTimeString("en-US", {
			hour: '2-digit',
			minute: '2-digit'
		});
		return `${date} ${time}`;
	}

	function getStoredUsers() {
		const users = localStorage.getItem("users");
		return users ? JSON.parse(users) : [];
	}

	function saveUsers(users) {
		localStorage.setItem("users", JSON.stringify(users));
	}

	function validateForm(name, email, password) {
		if (!name || !email || !password) {
			alert("All fields are required.");
			return false;
		}
		// Basic email pattern validation
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		}
		return true;
	}

	$('#submitBtn').on('click', function (e) {
		e.preventDefault();

		const name = $('#name').val().trim();
		const email = $('#email').val().trim();
		const password = $('#password').val().trim();

		if (!validateForm(name, email, password)) return;

		const users = getStoredUsers();

		const emailExists = users.some(user => user.username === email);
		if (emailExists) {
			alert("Email is already registered. Please use another email.");
			return;
		}

		const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

		const newUser = {
			id: newId,
			name: name,
			username: email,
			password: password,
			created: getCurrentTimestamp(),
			is_deleted: false,
			is_admin: false
		};

		users.push(newUser);
		saveUsers(users);

		sessionStorage.setItem("userId", newId);

		alert("Signup successful!");

		window.location.href = "index.html";
	});
});