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

