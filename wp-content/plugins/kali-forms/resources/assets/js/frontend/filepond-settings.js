/**
 * A small wrapper to create settings for the file pond plugin
 */
export default class FilePondSettings {
	/**
	 * URL etterg
	 *
	 * @readonly
	 * @memberof FilePondSettings
	 */
	get url() {
		return this._url;
	}
	/**
	 * URL setter
	 *
	 * @memberof FilePondSettings
	 */
	set url(v) {
		this._url = v;
	}
	/**
	 * Timeout getter
	 *
	 * @readonly
	 * @memberof FilePondSettings
	 */
	get timeout() {
		return this._timeout;
	}
	/**
	 * Timeout setter
	 *
	 * @memberof FilePondSettings
	 */
	set timeout(v) {
		this._timeout = parseInt(v);
	}

	/**
	 * Function to upload file to WP
	 *
	 * @readonly
	 * @memberof FilePondSettings
	 */
	get process() {
		const self = this;
		return (fieldName, file, metadata, load, error, progress, abort) => {
			const formData = new FormData();
			// let formId = this.getFormId(fieldName);
			formData.append('action', 'kaliforms_form_upload_file');
			formData.append(fieldName, file, file.name);
			// if (formId) {
			// 	formData.append('currentField', fieldName);
			// 	formData.append('formId', formId);
			// }

			const request = new XMLHttpRequest();
			request.open('POST', this.url);
			request.upload.onprogress = (e) => {
				progress(e.lengthComputable, e.loaded, e.total);
			};

			request.onload = function () {
				if (request.status >= 200 && request.status < 300) {
					if (self.isJson(request.response)) {
						let json = JSON.parse(request.response);
						if (json.hasOwnProperty('errors')) {
							return error('something went wrong');
						}
					}
					load(request.responseText);
				}
				else {
					error('oh no');
				}
			};

			request.send(formData);
			return {
				abort: () => {
					request.abort();
					abort();
				}
			};
		};
	}

	/**
	 * Revert function, is called when you click UNDO in the image
	 *
	 * @readonly
	 * @memberof FilePondSettings
	 */
	get revert() {
		return (uniqueFileId, load, error) => {
			const formData = new FormData();

			formData.append('action', 'kaliforms_form_delete_uploaded_file')
			formData.append('id', parseFloat(uniqueFileId))

			const request = new XMLHttpRequest();
			request.open('POST', this.url);
			request.send(formData);

			// error('oh my goodness');

			// Should call the load method when done, no parameters required
			load();
		}
	}

	/**
	 * This should return the object needed to make the request
	 *
	 * @readonly
	 * @memberof FilePondSettings
	 */
	get settings() {
		return {
			server: {
				url: this.url,
				timeout: this.timeout,
				process: this.process,
				revert: this.revert,
			},
			// These are coming from the backend ( translations )
			...this._labels
		}
	}

	/**
	 * Class constructor
	 * @memberof FilePondSettings
	 */
	constructor() {
		this._timeout = 7000;
		this._url = KaliFormsObject.ajaxurl;
		this._labels = KaliFormsObject.translations.filePond
	}

	isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	upTo(el, tagName) {
		tagName = tagName.toLowerCase();

		while (el && el.parentNode) {
			el = el.parentNode;
			if (el.tagName && el.tagName.toLowerCase() == tagName) {
				return el;
			}
		}
		return null;
	}

	getFormId(fieldName) {
		let query = [...document.getElementsByName(fieldName)];
		if (!query.length) {
			return false;
		}
		let item = query[0];
		// Should find form
		let form = this.upTo(item, 'form');
		return form !== null ? form.getAttribute('data-form-id') : false;
	}
}

