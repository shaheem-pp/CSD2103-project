ifUserInSession("index.html");

$(document).ready(function () {

	$('#showPassword').on('change', function () {
		const passwordField = $('#password');
		if ($(this).prop('checked')) {
			passwordField.attr('type', 'text');
		} else {
			passwordField.attr('type', 'password');
		}
	});

	// Password validation regex
	const passwordPatterns = {
		length: /.{6,}/,
		uppercase: /[A-Z]/,
		lowercase: /[a-z]/,
		number: /\d/,
		special: /[!@#$%^&*(),.?":{}|<>]/
	};

	function validatePassword(password) {

		let isValid = {
			length: passwordPatterns.length.test(password),
			uppercase: passwordPatterns.uppercase.test(password),
			lowercase: passwordPatterns.lowercase.test(password),
			number: passwordPatterns.number.test(password),
			special: passwordPatterns.special.test(password)
		};

		$('#length').html(isValid.length ? '<span class="text-success">✓</span> Minimum 6 characters' : '<span class="text-danger">×</span> Minimum 6 characters').toggleClass('text-success', isValid.length).toggleClass('text-danger', !isValid.length);
		$('#capital').html(isValid.uppercase ? '<span class="text-success">✓</span> At least 1 uppercase letter' : '<span class="text-danger">×</span> At least 1 uppercase letter').toggleClass('text-success', isValid.uppercase).toggleClass('text-danger', !isValid.uppercase);
		$('#lowercase').html(isValid.lowercase ? '<span class="text-success">✓</span> At least 1 lowercase letter' : '<span class="text-danger">×</span> At least 1 lowercase letter').toggleClass('text-success', isValid.lowercase).toggleClass('text-danger', !isValid.lowercase);
		$('#number').html(isValid.number ? '<span class="text-success">✓</span> At least 1 number' : '<span class="text-danger">×</span> At least 1 number').toggleClass('text-success', isValid.number).toggleClass('text-danger', !isValid.number);
		$('#special').html(isValid.special ? '<span class="text-success">✓</span> At least 1 special character' : '<span class="text-danger">×</span> At least 1 special character').toggleClass('text-success', isValid.special).toggleClass('text-danger', !isValid.special);

		return Object.values(isValid).every(Boolean);
	}

	$('#password').on('input', function () {
		const password = $(this).val();
		validatePassword(password);
	});

	$('#submitBtn').on('click', function (e) {
		e.preventDefault();

		const name = $('#name').val().trim();
		const email = $('#email').val().trim();
		const password = $('#password').val().trim();

		if (!validateForm(name, email, password) || !validatePassword(password)) return;

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

function getCurrentTimestamp() {
	return new Date().toISOString();
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
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		alert("Please enter a valid email address.");
		return false;
	}
	return true;
}