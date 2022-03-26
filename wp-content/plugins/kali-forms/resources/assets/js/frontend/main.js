import FormProcessor from "./form-processor";
import "./frontend.scss";

document.addEventListener(
	"DOMContentLoaded",
	() => {
		const forms = document.querySelectorAll(".kaliforms-form-container");
		Array.prototype.forEach.call(forms, (e) => {
			new FormProcessor(e);
		});
	},
	false
);

if (window?.CTCommonDirectives || window?.CTFrontendBuilder) {
	jQuery(document).ready(() => {
		const forms = document.querySelectorAll(".kaliforms-form-container");
		Array.prototype.forEach.call(forms, (e) => {
			new FormProcessor(e);
		});
	});
}

if (typeof wp !== "undefined" && wp.hasOwnProperty("customize")) {
	wp.customize.bind("preview-ready", () => {
		const forms = document.querySelectorAll(".kaliforms-form-container");
		Array.prototype.forEach.call(forms, (e) => {
			new FormProcessor(e);
		});
	});
}

window.KFP = FormProcessor;
