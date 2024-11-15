ifNotUserInSession();

$(document).ready(function () {
	const productContainer = $('#productContainer');

	function displayProducts(category) {
		productContainer.fadeOut(300, function () {
			$.getJSON('../data/products.json', function (data) {
				productContainer.empty();
				const filteredData = category === 'all' ? data : data.filter(product => product.category === category);
				filteredData.forEach(product => {
					let productCard = `
						<div class="col-md-3 mb-4">
							<div class="card h-100">
								<img src="${product.image}" class="card-img-top product-img-card" alt="${product.name}">
								<div class="card-body">
									<a href="product-detail.html?id=${product.id}"><h3 class="card-title">${product.name}</h3></a>
									<p class="card-text product-desciption-line-limit">${product.description}</p>
									<p class="card-text"><strong>Price: ${product.price}</strong></p>
									<p class="card-text"><small class="text-muted">Category: ${product.category}</small></p>
								</div>
							</div>
						</div>`;
					productContainer.append(productCard);
				});
				productContainer.fadeIn(300);
			}).fail(function () {
				console.error("Error loading products.json");
			});
		});
	}

	$('.btn').click(function () {
		const category = $(this).text().toLowerCase();
		$('.btn').removeClass('btn-dark').addClass('btn-light');
		$(this).removeClass('btn-light').addClass('btn-dark');
		displayProducts(category);
	});

	displayProducts('all');
});