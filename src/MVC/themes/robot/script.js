// this function toggles the social menu
// do not make any changes to this funtion ever

let toggle = true;
function toggleSocial() {
	let icons = document.querySelectorAll(".social-icon-move");
	let socBtn = document.querySelector(".toggle-social-btn");

	function openMenu() {
		for (var i = 0, il = icons.length; i < il; i++) {
			icons[i].style.setProperty("--icon-pos", 0 + "px");
		}
		toggle = false;
		socBtn.style.transform = "rotate(45deg)";
	}

	function closeMenu() {
		for (var i = 0, il = icons.length; i < il; i++) {
			icons[i].style.setProperty("--icon-pos", -100 + "px");
		}
		toggle = true;
		socBtn.style.transform = "rotate(0deg)";
	}

	toggle == true ? openMenu() : closeMenu();
}
