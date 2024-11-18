function ifNotUserInSession() {
	const userId = sessionStorage.getItem("userId");
	if (!userId) {
		window.location.href = "login.html";
	}
}

function ifUserInSession(goto) {
	const userId = sessionStorage.getItem("userId");
	if (userId) {
		window.location.href = goto;
	}
}

function greetUser() {
	const userId = sessionStorage.getItem('userId');
	const usersData = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null;
	if (usersData && userId) {
		// Find the user with the matching userId
		const user = usersData.find(user => user.id == userId);

		// Get the current hour
		const currentHour = new Date().getHours();
		let greeting;

		// Determine the greeting based on the time of day
		if (currentHour < 12) {
			greeting = "Good Morning";
		} else if (currentHour < 18) {
			greeting = "Good Afternoon";
		} else {
			greeting = "Good Evening";
		}

		// If user is found, update the greeting text
		if (user) {
			$('#greetings').text(`${greeting}, ${user.name}`);
		} else {
			console.log("User not found.");
		}
	} else {
		console.log("Users data not found or userId is not set in session.");
	}
}

// Call the function
$(document).ready(function () {
	greetUser();
});