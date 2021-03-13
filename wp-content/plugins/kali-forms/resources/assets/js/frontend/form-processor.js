import axios from 'axios';
import Qs from 'qs';
import * as FilePond from 'filepond';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondSettings from './filepond-settings';
import PaymentHelper from './payment-helper.js';
const FPSettings = new FilePondSettings();
FilePond.setOptions(FPSettings.settings);
FilePond.registerPlugin(FilePondPluginFileRename);
FilePond.registerPlugin(FilePondPluginFileValidateSize);
FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginFileValidateType);

export default class FormProcessor {
	/**
	 * Sets loading state of the form
	 *
	 * @memberof FormProcessor
	 */
	set loading(value) {
		this._loading = value;
		value ? this.appendLoader() : this.removeLoader()
	}
	/**
	 * Get loading state
	 *
	 * @memberof FormProcessor
	 */
	get loading() {
		return this._loading;
	}
	/**
	 * Check if the form elements are all valid
	 *
	 * @readonly
	 * @memberof FormProcessor
	 */
	get valid() {
		let checks = { formValidation: true };

		if (this.grecaptcha) {
			checks = { ...checks, recaptcha: this.grecaptchaValidation }
		}
		return this.grecaptcha ? (checks.formValidation && checks.recaptcha) : checks.formValidation
	}

	/**
	 * Class constructor
	 * @param {*} nodeElement
	 * @memberof FormProcessor
	 */
	constructor(nodeElement) {
		this.id = nodeElement.getAttribute('id');
		this.formId = parseInt(nodeElement.getAttribute('data-form-id'));
		this.form = nodeElement;
		this.formElements = this.form.elements;
		this.uploadFields = [];
		this.nonce = KaliFormsObject.ajax_nonce;

		// AJAX RELATED
		this.axios = axios;
		this.Qs = Qs;

		this.handleFileUploads();
		this.handleRecaptcha();
		this.handleSubmit();
		this.handlePayments(PaymentHelper);
		// Init paypal
		if (typeof paypal !== 'undefined') {
			this.handlePayPalPayment(paypal);
		}

		document.dispatchEvent(new CustomEvent('kaliFormProcessConstructed', { detail: this }))
	}

	/**
	 * Create functions from mixin
	 *
	 * @param {*} PaymentHelper
	 * @memberof FormProcessor
	 */
	handlePayments(PaymentHelper) {
		for (let key in PaymentHelper) {
			this[key] = PaymentHelper[key].bind(this)
		}

		this.payments = null;
		this.paymentForm = true;
	}

	/**
	 * Handles file uploads
	 */
	handleFileUploads() {
		let fields = this.form.querySelectorAll("[type='file']");
		[...fields].map(field => {
			let pond = FilePond.create(field);

			this.uploadFields.push(field.getAttribute('name'));
			const options = {
				/**
				 * Required field attribute
				 */
				required: field.hasAttribute('required'),
				/**
				 * Name of the field
				 */
				name: field.getAttribute('name'),
				/**
				 * Is the field disabled?
				 */
				disabled: field.hasAttribute('readonly'),
				/**
				* In case we allow image preview
				*/
				allowImagePreview: field.hasAttribute('imagepreview'),
				/**
				 * Max file size
				 */
				maxFileSize: field.getAttribute('data-maxfilesize'),
				/**
				 * Instant upload files to the server
				 */
				instantUpload: field.hasAttribute('instantupload'),
				/**
				 * File type validation
				 */
				acceptedFileTypes: field.getAttribute('data-acceptedextensions') !== null ? field.getAttribute('data-acceptedextensions').split(',') : null,
				/**
				 * Add a file prefix
				 */
				fileRenameFunction: (file) => {
					let prefix = field.getAttribute('data-fileprefix')
					return prefix !== null ? `${prefix}${file.name}` : file.name;
				},
				/**
				 * Callback when field is ready to use
				 */
				oninit: () => document.dispatchEvent(new CustomEvent('kaliFormUploadFieldInit', {
					detail: { name: field.getAttribute('name'), instance: pond }
				}))
			}

			pond.setOptions(options);
		});
	}

	/**
	 * Handles recaptcha
	 */
	handleRecaptcha() {
		this.grecaptcha = false;
		let grecaptchas = document.querySelectorAll("[data-field-type='grecaptcha']")
		grecaptchas = [...grecaptchas];
		if (!grecaptchas.length) {
			return;
		}
		if (typeof grecaptcha === 'undefined') {
			return;
		}

		this.grecaptcha = true;
		grecaptcha.ready(() => {
			grecaptchas.map(e => {
				grecaptcha.render(e.getAttribute('id'),
					{
						sitekey: e.getAttribute('data-sitekey'),
						callback: this.verifyRecaptchaCallback.bind(this)
					}
				)
			})
		})
	}

	/**
	 * Verifies if the recaptcha is valid
	 * @param {String} res
	 */
	verifyRecaptchaCallback(res) {
		const data = { action: 'kaliforms_form_verify_recaptcha', data: { formId: this.formId, nonce: this.nonce, token: res } };

		this.axios.post(KaliFormsObject.ajaxurl, this.Qs.stringify(data))
			.then(r => {
				if (r.data.hasOwnProperty('error')) {
					this.throwError();
				} else {
					this.grecaptchaValidation = r.data.response.success;
				}
			})
			.catch(e => {
				console.log(e);
			});
	}

	/**
	 * Sets up validation
	 *
	 * @memberof FormProcessor
	 */
	setupValidation() {
		// console.log(Validate)
		// console.log('setting up validation')
	}

	/**
	 * Handles form submit
	 *
	 * @memberof FormProcessor
	 */
	handleSubmit() {
		this.form.addEventListener('submit', evt => {
			evt.preventDefault()
			document.getElementById(`kaliforms-global-error-message-${this.formId}`).style.display = 'none';
			this.loading = true;
			this.valid ? this.makeRequest() : this.throwError();
		}, true)
	}

	/**
	 * Throw error if form is not valid
	 */
	throwError() {
		document.getElementById(`kaliforms-global-error-message-${this.formId}`).style.display = 'block';
		this.loading = false;
	}

	/**
	 * Makes ajax request
	 *
	 * @memberof FormProcessor
	 */
	makeRequest() {
		const data = { action: 'kaliforms_form_process', data: this._getFormData(), extraArgs: this._getExtra() };

		if (this.paymentForm) {
			data.payments = this.payments;
		}

		axios.post(KaliFormsObject.ajaxurl, Qs.stringify(data))
			.then(r => {
				if (r.data.hasOwnProperty('error')) {
					this.throwError();
				} else {
					this.loading = false;
					this.showThankYouMessage(r.data)

					if (r.data.hasOwnProperty('redirect_url') && r.data.redirect_url !== '') {
						setTimeout(() => window.location.href = r.data.redirect_url, 5000)
					}
				}
			})
			.catch(e => {
				console.log(e);
			});
	}
	/**
	 * We use this object only for field uploads at the moment
	 */
	_getExtra() {
		return this.uploadFields
	}
	/**
	 * Gets form data
	 *
	 * @memberof FormProcessor
	 */
	_getFormData() {
		let arr = {
			formId: this.formId,
			nonce: this.nonce,
		};
		let values = [];
		[...this.formElements].map(e => {
			let type = e.getAttribute('type');
			switch (type) {
				case 'checkbox':
					let values = [];
					[...document.getElementsByName(e.getAttribute('name'))].map(el => el.checked ? values.push(el.value) : false)
					arr[e.getAttribute('name')] = values
					break;
				case 'radio':
					let value = '';
					[...document.getElementsByName(e.getAttribute('name'))].map(el => el.checked ? value = el.value : false)
					arr[e.getAttribute('name')] = value
					break;
				case 'submit':
					break;
				case 'choices':
					let selected = e.querySelectorAll('option:checked');
					arr[e.getAttribute('name')] = Array.from(selected).map(el => el.value);
					break;
				default:
					if (e.getAttribute('name') !== null) {
						arr[e.getAttribute('name')] = e.value
					}
					break;
			}
		})

		return arr;
	}
	/**
	 * Shows the thank you message
	 *
	 * @param {*} response
	 * @memberof FormProcessor
	 */
	showThankYouMessage(response) {
		this.form.classList.add('fade-out-top');

		let animationEvent = this.whichAnimationEvent();
		animationEvent && this.form.addEventListener(animationEvent, () => {
			this.form.insertAdjacentHTML('beforebegin', `<div id="kaliforms-thank-you-message">${response.thank_you_message}</div>`);
			this.form.parentNode.removeChild(this.form)
		});


	}
	/**
	 * Appends loader
	 *
	 * @memberof FormProcessor
	 */
	appendLoader() {
		this.form.classList.add('kaliform-loading');
		let loader = '<div id="kaliform-loader-container" class="kaliform-loader-container"><div class="kaliform-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';
		this.form.insertAdjacentHTML('beforeend', loader);
	}
	/**
	 * Removes loader
	 *
	 * @memberof FormProcessor
	 */
	removeLoader() {
		let loader = document.getElementById('kaliform-loader-container');
		this.form.classList.remove('kaliform-loading');
		this.form.removeChild(loader);
	}

	/**
	 * Is the form valid ?
	 *
	 * @returns
	 * @memberof FormProcessor
	 */
	validForm() {
		let cont = true;
		[...this.formElements].map(e => {
			if (!e.checkValidity()) {
				cont = false;
			}
		});
		// this.valid = cont;
		return cont;
	}

	/**
	 * Cross Browser compatibility for animation end
	 *
	 * @param {*} element
	 * @param {*} type
	 * @param {*} callback
	 * @memberof FormProcessor
	 */
	whichAnimationEvent() {
		let t;
		let el = document.createElement('fakeelement');
		let transitions = {
			'animation': 'animationend',
			'OAnimation': 'oAnimationEnd',
			'MozAnimation': 'animationend',
			'WebkitAnimation': 'webkitAnimationEnd'
		}

		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t];
			}
		}
	}
}
