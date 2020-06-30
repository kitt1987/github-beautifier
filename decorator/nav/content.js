function InitCentralizeNav() {
	window.addEventListener('resize', () => {EnableCentralizeNav();});
	EnableCentralizeNav();
}

function EnableCentralizeNav() {
	let main = document.getElementsByClassName("application-main");
	if (!main || main.length == 0) {
		console.log("main view not found");
		return;
	}

	let CentralizeNav = main[0].getElementsByClassName("UnderlineNav-body");
	if (!CentralizeNav || CentralizeNav.length == 0) {
		console.log("CentralizeNav bar not found!");
		return;
	}

	let repo = main[0].getElementsByClassName("repository-content");
	if (!repo || repo.length == 0) {
		console.log("repo view not found!");
		return;
	}

	CentralizeNav[0].style.paddingLeft = (repo[0].offsetLeft-CentralizeNav[0].offsetLeft) + "px";
}

function DisableCentralizeNav() {
	let main = document.getElementsByTagName("main");
	if (!main || main.length == 0) {
		console.log("main view not found");
		return;
	}

	let CentralizeNav = document.getElementsByClassName("UnderlineNav-body");
	if (!CentralizeNav || CentralizeNav.length == 0) {
		console.log("CentralizeNav bar not found!");
		return;
	}

	CentralizeNav[0].style.paddingLeft = "";
}

InitCentralizeNav();
