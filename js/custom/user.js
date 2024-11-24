$(document).ready(function () {
	// Fetch userId from session (assuming it's stored in the sessionStorage)
	let userId = sessionStorage.getItem('userId');

	if (userId) {
		userId = parseInt(userId);
		const users = JSON.parse(localStorage.getItem('users'));
		const user = users.find(u => u.id === userId);

		if (user) {
			$('#userName').text(user.name);

			$('.form').html(`
                <form id="userForm">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" value="${user.name}">
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label">Email</label>
                        <input type="text" class="form-control" id="username" value="${user.username}">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value="${user.password}">
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="checkbox" id="showPassword">
                            <label class="form-check-label" for="showPassword">Show Password</label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" id="updateUser">Update</button>
					<button type="button" class="btn btn-danger" id="signOutUser">Sign out</button>
                </form>
            `);
		}

		$('#showPassword').change(function () {
			const passwordField = $('#password');
			if ($(this).is(':checked')) {
				passwordField.attr('type', 'text');
			} else {
				passwordField.attr('type', 'password');
			}
		});

		$('#updateUser').click(function () {
			const updatedName = $('#name').val();
			const updatedUsername = $('#username').val();
			const updatedPassword = $('#password').val();

			user.name = updatedName;
			user.username = updatedUsername;
			user.password = updatedPassword;

			localStorage.setItem('users', JSON.stringify(users));

			alert('User details updated successfully!');
			$('#userName').text(user.name);
		});

		$('#signOutUser').click(function () {
			sessionStorage.removeItem('userId');
			window.location.href = 'login.html';
			alert('Signed out successfully!');
		});

	} else {
		alert('User not found or session expired.');
	}
});