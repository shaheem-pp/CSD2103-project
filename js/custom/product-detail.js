ifNotUserInSession()

$(document).ready(function () {
	let productQuantity = 0;
	let maxQuantity = 0;
	let selectedSize = '';

	const userId = sessionStorage.getItem('userId');

	$.getJSON("../data/products.json", function (data) {
		const productId = getProductIdFromUrl();

		if (!productId) {
			window.location.href = "index.html";
			return;
		}

		const product = data.find(item => item.id == productId);

		// product data update with the id
		if (product) {
			$("#product-title").text(product.name);
			$("#product-price").text(product.price);
			$("#product-category").text(`Category: ${product.category}`);
			$("#product-description").html(formatDescription(product.description));
			$("#product-image").attr("src", product.image);
			productQuantity = product.quantity;
			maxQuantity = productQuantity;

			updateStockForPurchases(productId);
			renderColorsAndSizes(product);
		} else {
			window.location.href = "index.html";
		}
	});

	function updateStockForPurchases(productId) {
		const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
		const productPurchases = purchases.filter(p => p.productId == productId && !p.is_deleted);

		maxQuantity = productQuantity;

		productPurchases.forEach(purchase => {
			if (purchase.size === selectedSize) {
				maxQuantity = Math.max(0, maxQuantity - purchase.quantity);
			}
		});

		$("#inStock").text(`In Stock: ${maxQuantity}`);
	}

	$('#available-sizes').on('click', 'button', function () {
		if ($(this).hasClass('btn-outline-dark')) {
			$('#available-sizes button').removeClass('btn-dark').addClass('btn-outline-dark');
			$(this).removeClass('btn-outline-dark').addClass('btn-dark');
			selectedSize = $(this).text();
			updateStockForPurchases(getProductIdFromUrl());
		}
	});

	$('#increment').click(function () {
		const currentQuantity = parseInt($('#quantity').val());
		if (currentQuantity < maxQuantity) {
			$('#quantity').val(currentQuantity + 1);
		}
	});

	$('#decrement').click(function () {
		const currentQuantity = parseInt($('#quantity').val());
		if (currentQuantity > 1) {
			$('#quantity').val(currentQuantity - 1);
		}
	});

	$('.btn-primary').click(function () {
		const quantity = parseInt($('#quantity').val());
		if (!selectedSize) {
			alert("Please select a size.");
			return;
		}

		if (quantity > maxQuantity) {
			alert("Quantity exceeds available stock.");
			return;
		}

		const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
		const newId = purchases.length ? purchases[purchases.length - 1].id + 1 : 1;

		const newPurchase = {
			id: newId,
			userId: parseInt(userId),
			productId: parseInt(getProductIdFromUrl()),
			size: selectedSize,
			quantity: quantity,
			created: getCurrentTimestamp(),
			is_deleted: false
		};

		purchases.push(newPurchase);
		localStorage.setItem('purchases', JSON.stringify(purchases));

		updateStockForPurchases(newPurchase.productId);

		alert("Order placed successfully!");
		resetOrderForm();
	});

	function resetOrderForm() {
		$('#quantity').val(1);
		selectedSize = '';
		$('#available-sizes button').removeClass('btn-dark').addClass('btn-outline-dark');
	}

	function getProductIdFromUrl() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('id');
	}

	function formatDescription(description) {
		return description.replace(/\n/g, '<br>');
	}

	function renderColorsAndSizes(product) {
		$("#inStock").text(`In Stock: ${maxQuantity}`);

		$('#available-colors').append(`
			<div class="d-flex align-items-center m-1">
				<div style="width: 20px; height: 20px; background-color: ${product.colorCode};" class="rounded"></div>
				<span class="ms-2">${product.color}</span>
			</div>
		`);

		const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
		$('#available-sizes').empty();
		allSizes.forEach(size => {
			const isSizeAvailable = product.size.includes(size);
			const sizeClass = isSizeAvailable ? 'btn-outline-dark' : 'btn-outline-secondary';
			$('#available-sizes').append(`
				<button type="button" class="btn ${sizeClass} m-1" ${isSizeAvailable ? '' : 'disabled'}>${size}</button>
			`);
		});
	}
});