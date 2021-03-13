export default {
    /**
     * Gather and test products with server
     */
	gatherProducts() {
		const data = { action: 'kaliforms_form_verify_products', data: { formId: this.formId } };

		this.axios.post(KaliFormsObject.ajaxurl, this.Qs.stringify(data))
			.then(r => {
				this._products = (r.data.response === 'ok') ? [] : r.data.response;
				// console.log(r.data.response.success);
			})
			.catch(e => {
				console.log(e);
			});
	},

    /**
     * Get cart contents
     */
	getCart() {
		let price = 0;
		let currency = 'USD';
		let description = [];
		this._products.map(e => {
			this._payee = typeof e.payee !== 'undefined' ? e.payee : null;
			if (e.type === 'product') {
				price += parseInt(e.price);
				description.push(e.caption);
			}

			if (e.type === 'multipleProducts' && this.isSelectedPrice(e)) {
				price += parseInt(e.price)
				description.push(e.caption);
			}

			currency = e.currency;
		});

		return { price: price.toFixed(2), description: description.join(','), currency };
	},

	isSelectedPrice(e) {
		let items = [...document.querySelectorAll(`[data-internal-id="${e.id.toLowerCase()}"]`)]
		if (!items.length) {
			return false;
		}

		if (typeof items.find(r => r.checked) === 'undefined') {
			return false;
		}

		if (parseInt(items.find(r => r.checked).value) === parseInt(e.price)) {
			return true;
		}
	},

    /**
     * PayPal Specific callbacks
     */

    /**
     * When a payment is approved, we need to dispatch the form submit event
     * @param {*} data
     * @param {*} actions
     */
	onApprove(data, actions) {
		this.loading = true;
		return actions.order.capture().then(details => {
			// alert('Transaction completed by ' + details.payer.name.given_name);
			// Call your server to save the transaction
			this.payments = {
				payment_id: details.id,
				payer: details.payer,
				status: details.status
			};
			this.loading = false;
			this.form.dispatchEvent(new Event('submit'));
		});
	},
    /**
     * Create order callback
     *
     * @param {*} data
     * @param {*} actions
     */
	createOrder(data, actions) {
		const cart = this.getCart();
		let orderObj = {
			purchase_units: [
				{
					amount: {
						value: cart.price,
						currency_code: cart.currency,
					},
					description: cart.description,
				}
			]
		}
		if (this._payee !== null) {
			orderObj.purchase_units[0].payee = {
				email_address: this._payee,
			}
		}

		return actions.order.create(orderObj);
	},
    /**
     * Callback when buttons are rendered
     * @param {*} data
     * @param {*} actions
     */
	onInit(data, actions) {
		this.validForm() ? actions.enable() : actions.disable();

		this.form.addEventListener('change', (e) => {
			this.validForm() ? actions.enable() : actions.disable();
		})
	},
    /**
     * Button click callback
     * @param {*} data
     * @param {*} actions
     */
	onClick(data, actions) {
		[...this.formElements].map(e => {
			e.reportValidity();
		});
	},

	/**
	 * Handles PayPal
	 *
	 * @param {*} paypalObject
	 * @memberof FormProcessor
	 */
	handlePayPalPayment(paypalObject) {
		this.gatherProducts();
		this.createOrder = this.createOrder.bind(this);
		this.onApprove = this.onApprove.bind(this);
		this.onInit = this.onInit.bind(this);
		this.onClick = this.onClick.bind(this);

		paypalObject.Buttons({
			onInit: this.onInit,
			onClick: this.onClick,
			createOrder: this.createOrder,
			onApprove: this.onApprove,
		}).render('#kaliforms-paypal-button-container');
	}
}
