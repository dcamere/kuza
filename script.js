
document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('quoteForm');
	const quoteDetail = document.getElementById('quoteDetail');
	const whatsappBtn = document.getElementById('whatsappBtn');

	let lastQuote = null;

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const productName = form.productName.value.trim();
		const amazonLink = form.amazonLink.value.trim();
		const weight = parseFloat(form.weight.value);
		const price = parseFloat(form.price.value);
		const productType = form.productType.options[form.productType.selectedIndex].text;

		let shippingCost = 0;
		let feeType = '';
		if (price < 100) {
			shippingCost = weight * 20;
			feeType = 'Tarifa fija por peso ($20 por kilo)';
		} else {
			shippingCost = price * 0.20;
			feeType = 'Tarifa fija 20% del precio';
		}
		const total = price + shippingCost;

		lastQuote = {
			productName,
			amazonLink,
			weight,
			price,
			productType,
			shippingCost,
			feeType,
			total
		};

		quoteDetail.innerHTML = `
			<h2>Detalle de Cotización</h2>
			<p><strong>Producto:</strong> ${productName}</p>
			<p><strong>Tipo:</strong> ${productType}</p>
			<p><strong>Link de Amazon:</strong> <a href="${amazonLink}" target="_blank">${amazonLink}</a></p>
			<p><strong>Peso:</strong> ${weight.toFixed(2)} kg</p>
			<p><strong>Precio:</strong> $${price.toFixed(2)}</p>
			<p><strong>${feeType}:</strong> $${shippingCost.toFixed(2)}</p>
			<hr>
			<p><strong>Total estimado:</strong> <span style="color:#f76b1c;font-size:1.2em;">$${total.toFixed(2)}</span></p>
		`;
		quoteDetail.style.display = 'block';
		whatsappBtn.style.display = 'block';
	});

	whatsappBtn.addEventListener('click', function() {
		if (!lastQuote) return;
		const msg = `Hola, quiero hacer un pedido:\n\n` +
			`Producto: ${lastQuote.productName}\n` +
			`Tipo: ${lastQuote.productType}\n` +
			`Link de Amazon: ${lastQuote.amazonLink}\n` +
			`Peso: ${lastQuote.weight.toFixed(2)} kg\n` +
			`Precio: $${lastQuote.price.toFixed(2)}\n` +
			`${lastQuote.feeType}: $${lastQuote.shippingCost.toFixed(2)}\n` +
			`Total estimado: $${lastQuote.total.toFixed(2)}`;
		const url = `https://wa.me/51902014530?text=${encodeURIComponent(msg)}`;
		window.open(url, '_blank');
	});
});
