$(document).ready(function () {

	function getProductIdFromUrl() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('id');
	}

	function formatDescription(description) {
		return description.replace(/\n/g, '<br>');
	}

	$.getJSON("../data/products.json", function (data) {
		const productId = getProductIdFromUrl();

		if (!productId) {
			window.location.href = "index.html";
			return;
		}
		const product = data.find(item => item.id == productId);

		if (product) {
			$("#product-title").text(product.name);
			$("#product-price").text(product.price);
			$("#product-category").text(`Category: ${product.category}`);
			$("#product-description").html(formatDescription(product.description));
			$("#product-stock").text(`In Stock: ${product.quantity}`);
			$("#product-image").attr("src", product.image);
		} else {
			window.location.href = "index.html";
		}
	}).fail(function () {
		console.error("Failed to load product data.");
		window.location.href = "index.html";
	});
});