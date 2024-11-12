ifNotUserInSession();

$(document).ready(function () {
	$.getJSON('../data/products.json', function (data) {
		let productContainer = $('#productContainer');
		productContainer.empty();

		data.forEach(product => {
			let productCard = `
                <div class="col-md-3 mb-4">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top product-img-card" alt="${product.name}">
                        <div class="card-body">
                            <h3 class="card-title">${product.name}</h3>
                            <p class="card-text product-desciption-line-limit">${product.description}</p>
                            <p class="card-text"><strong>Price: ${product.price}</strong></p>
                            <p class="card-text"><small class="text-muted">Category: ${product.category}</small></p>
                        </div>
                    </div>
                </div>`;

			productContainer.append(productCard);
		});
	}).fail(function () {
		console.error("Error loading products.json");
	});
});