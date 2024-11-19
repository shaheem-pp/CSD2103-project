$(document).ready(function () {

	const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
	let productQuantity = 0;
	let maxQuantity = 0;

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
			$("#product-image").attr("src", product.image);
			productQuantity = product.quantity;
			maxQuantity = productQuantity;

			$("#inStock").text(`In Stock: ${maxQuantity}`);

			$('#available-colors').append(`
				<div class="d-flex align-items-center m-1">
					<div style="width: 20px; height: 20px; background-color: ${product.colorCode};" class="rounded"></div>
					<span class="ms-2">${product.color}</span>
				</div>
				`);



			let selectedSize = '';
			$('#available-sizes').empty();
			allSizes.forEach(size => {
				const isSizeAvailable = product.size.includes(size);
				const sizeClass = isSizeAvailable ? 'btn-outline-dark' : 'btn-outline-secondary';
				const sizeTitle = isSizeAvailable ? size : `${size}`;
				$('#available-sizes').append(`
        			<button type="button" class="btn ${sizeClass} m-1" ${isSizeAvailable ? '' : 'disabled'}>${sizeTitle}</button>
    			`);
			});
			$('#available-sizes').on('click', 'button', function () {
				if ($(this).hasClass('btn-outline-dark')) {
					selectedSize = $(this).text();
					$('#available-sizes button').each(function () {
						if ($(this).text() === selectedSize) {
							$(this).removeClass('btn-outline-dark').addClass('btn-dark');
						} else if ($(this).hasClass('btn-dark')) {
							$(this).removeClass('btn-dark').addClass('btn-outline-dark');
						}
					});
					console.log(selectedSize);
					
				}
			});




		} else {
			window.location.href = "index.html";
		}
	}).fail(function () {
		console.error("Failed to load product data.");
		window.location.href = "index.html";
	});

	$('#decrement').click(function () {
		let currentQuantity = parseInt($('#quantity').val());
		if (currentQuantity > 0) {
			$('#quantity').val(currentQuantity - 1);
		} else {
			flashBorder();
		}
	});

	$('#increment').click(function () {
		let currentQuantity = parseInt($('#quantity').val());
		if (currentQuantity < maxQuantity) {
			$('#quantity').val(currentQuantity + 1);
		} else {
			flashBorder();
		}
	});

	function flashBorder() {
		$('#quantity').addClass('flash-border');
		setTimeout(function () {
			$('#quantity').removeClass('flash-border');
		}, 500);
	}
});