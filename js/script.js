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
		const user = usersData.find(user => user.id == userId);
		const currentHour = new Date().getHours();
		let greeting;

		if (currentHour < 12) {
			greeting = "Good Morning";
		} else if (currentHour < 18) {
			greeting = "Good Afternoon";
		} else {
			greeting = "Good Evening";
		}

		if (user) {
			$('#greetings').text(`${greeting}, ${user.name}!`);
		} else {
			console.log("User not found.");
		}
	} else {
		console.log("Users data not found or userId is not set in session.");
	}
}

function getCurrentTimestamp() {
	let current = new Date();
	let date = current.toLocaleDateString("en-CA");
	let time = current.toLocaleTimeString("en-US", {
		hour: '2-digit',
		minute: '2-digit'
	});
	return `${date} ${time}`;
}

$(document).ready(function () {
	greetUser();
});