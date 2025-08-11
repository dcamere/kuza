	// Actualizar el label de peso según la unidad seleccionada
	const weightLabel = document.querySelector('label[for="weight"]');
	const weightUnitSelect = document.getElementById('weightUnit');
	if (weightLabel && weightUnitSelect) {
		weightUnitSelect.addEventListener('change', function() {
			if (weightUnitSelect.value === 'lb') {
				weightLabel.textContent = 'Peso (lb)';
			} else {
				weightLabel.textContent = 'Peso (kg)';
			}
		});
	}


document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('quoteForm');
	const modalQuote = document.getElementById('modalQuote');
	const modalQuoteDetail = document.getElementById('modalQuoteDetail');
	const closeQuoteModal = document.getElementById('closeQuoteModal');
	const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
	const modalTerms = document.getElementById('modalTerms');
	const closeTermsModal = document.getElementById('closeTermsModal');
	const acceptTermsBtn = document.getElementById('acceptTermsBtn');

	let lastQuote = null;

	// Abrir modal de cotización al cotizar

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const productName = form.productName.value.trim();
		const amazonLink = form.amazonLink.value.trim();
		let weight = parseFloat(form.weight.value);
		const weightUnit = form.weightUnit.value;
		const price = parseFloat(form.price.value);
		const productType = form.productType.options[form.productType.selectedIndex].text;

		let weightKg = weight;
		let weightText = `${weight.toFixed(2)} kg`;
		if (weightUnit === 'lb') {
			weightKg = weight * 0.453592;
			weightText = `${weight.toFixed(2)} lb (${weightKg.toFixed(2)} kg)`;
		}

		let shippingCost = 0;
		let feeType = '';
		if (price < 100) {
			shippingCost = weightKg * 20;
			feeType = 'Tarifa fija por peso ($20 por kilo)';
		} else {
			shippingCost = price * 0.20;
			feeType = 'Tarifa fija 20% del precio';
		}
		const total = price + shippingCost;

		lastQuote = {
			productName,
			amazonLink,
			weight: weightKg,
			price,
			productType,
			shippingCost,
			feeType,
			total,
			weightText
		};

		modalQuoteDetail.innerHTML = `
			<h2>Detalle de Cotización</h2>
			<p><strong>Producto:</strong> ${productName}</p>
			<p><strong>Tipo:</strong> ${productType}</p>
			<p><strong>Link de Amazon:</strong> <a href="${amazonLink}" target="_blank">${amazonLink}</a></p>
			<p><strong>Peso:</strong> ${weightText}</p>
			<p><strong>Precio:</strong> $${price.toFixed(2)}</p>
			<p><strong>${feeType}:</strong> $${shippingCost.toFixed(2)}</p>
			<hr>
			<p><strong>Total estimado:</strong> <span style="color:#f76b1c;font-size:1.2em;">$${total.toFixed(2)}</span></p>
		`;
		modalQuote.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	// Cerrar modal de cotización
	closeQuoteModal.addEventListener('click', function() {
		modalQuote.style.display = 'none';
		document.body.style.overflow = '';
	});

	// Abrir modal de términos y condiciones al intentar enviar por Whatsapp
	modalWhatsappBtn.addEventListener('click', function() {
		modalTerms.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	// Cerrar modal de términos
	closeTermsModal.addEventListener('click', function() {
		modalTerms.style.display = 'none';
		document.body.style.overflow = '';
	});

	// Aceptar términos y enviar por Whatsapp
	acceptTermsBtn.addEventListener('click', function() {
		if (!lastQuote) return;
		modalTerms.style.display = 'none';
		modalQuote.style.display = 'none';
		document.body.style.overflow = '';
		const msg = `Hola, quiero hacer un pedido:\n\n` +
			`Producto: ${lastQuote.productName}\n` +
			`Tipo: ${lastQuote.productType}\n` +
			`Link de Amazon: ${lastQuote.amazonLink}\n` +
			`Peso: ${lastQuote.weightText}\n` +
			`Precio: $${lastQuote.price.toFixed(2)}\n` +
			`${lastQuote.feeType}: $${lastQuote.shippingCost.toFixed(2)}\n` +
			`Total estimado: $${lastQuote.total.toFixed(2)}`;
		const url = `https://wa.me/51902014530?text=${encodeURIComponent(msg)}`;
		window.open(url, '_blank');
	});

	// Cerrar modales al hacer click fuera del contenido
	window.addEventListener('click', function(event) {
		if (event.target === modalQuote) {
			modalQuote.style.display = 'none';
			document.body.style.overflow = '';
		}
		if (event.target === modalTerms) {
			modalTerms.style.display = 'none';
			document.body.style.overflow = '';
		}
	});
});
