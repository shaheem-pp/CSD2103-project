ifNotUserInSession();

$(document).ready(function () {
	const productContainer = $('#productContainer');

	function displayProducts(category, searchQuery = '') {
		productContainer.fadeOut(300, function () {
			$.getJSON('../data/products.json', function (data) {
				productContainer.empty();

				const filteredData = data.filter(product => {
					const matchesCategory = category === 'all' || product.category === category;
					const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						product.shortdescription.toLowerCase().includes(searchQuery.toLowerCase());
					return matchesCategory && matchesSearch;
				});

				if (filteredData.length === 0) {
					productContainer.append(`
						<div class="alert alert-danger text-center w-100" role="alert">
							No product found
						</div>
					`);
				} else {
					filteredData.forEach(product => {
						let productCard = `
							<div class="col-md-3 mb-4">
								<a href="product-detail.html?id=${product.id}" class="card-link">
									<div class="card h-100 hover-card">
										<img src="${product.image}" class="card-img-top product-img-card" alt="${product.name}">
										<div class="card-body">
											<h3 class="card-title product-card-title">${product.name}</h3>
											<p class="card-text product-desciption-line-limit">${product.shortdescription}</p>
											<p class="card-text"><strong>Price: ${product.price}</strong></p>
										</div>
									</div>
								</a>
							</div>`;
						productContainer.append(productCard);
					});
				}

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
		displayProducts(category, $('#search').val());
	});

	$('#search').on('input', function () {
		const category = $('.btn-dark').text().toLowerCase();
		const searchQuery = $(this).val();
		displayProducts(category, searchQuery);
	});

	displayProducts('all');
});