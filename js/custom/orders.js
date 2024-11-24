ifNotUserInSession();



$(document).ready(function () {
	const userId = sessionStorage.getItem('userId');
	
	greetUser();

	function displayOrders(userId) {
		const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
		const userPurchases = purchases.filter(purchase => purchase.userId == userId);

		const ordersContainer = $('#orders');

		if (userPurchases.length === 0) {
			ordersContainer.append('<div class="alert alert-warning">No previous orders found.</div>');
		} else {
			$.getJSON('../data/products.json', function (products) {
				userPurchases.forEach(purchase => {
					const product = products.find(product => product.id == purchase.productId);

					if (product) {
						// Validate price and quantity
						const price = parseFloat(product.price.replace('$', ''));
						const quantity = parseInt(purchase.quantity);

						// Check if price and quantity are valid numbers
						if (!isNaN(price) && !isNaN(quantity)) {
							const totalPrice = price * quantity;
							const orderCard = `
                                <div class="order-card">
                                    <img src="${product.image}" alt="${product.name}">
                                    <div class="order-card-details">
                                        <h5>${product.name}</h5>
                                        <p><strong>Size:</strong> ${purchase.size}</p>
                                        <p><strong>Quantity:</strong> ${purchase.quantity}</p>
										<p><strong>Purchased on:</strong> ${purchase.created}</p>
                                        <p class="price">Price: $${totalPrice.toFixed(2)}</p>										
                                    </div>
                                </div>
                            `;
							ordersContainer.append(orderCard);
						} else {
							ordersContainer.append('<div class="alert alert-danger">Invalid product price or quantity.</div>');
						}
					}
				});
			}).fail(function () {
				ordersContainer.append('<div class="alert alert-danger">Error loading product data.</div>');
			});
		}
	}

	if (userId) {
		displayOrders(userId);
	} else {
		alert('User not logged in!');
	}
});