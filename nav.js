function alignNavToCenter() {
	let main = document.getElementById("js-repo-pjax-container");
	if (!main) {
		console.error("main view not found");
		return;
	}

	let nav = main.getElementsByClassName("UnderlineNav-body");
	if (!nav || nav.length == 0) {
		console.error("nav bar not found!");
		return;
	}

	let repo = main.getElementsByClassName("repository-content");
	if (!repo || repo.length == 0) {
		console.error("repo view not found!");
		return;
	}

	console.log(repo[0].offsetLeft);
	nav[0].style.paddingLeft = (repo[0].offsetLeft-nav[0].offsetLeft) + "px";
}
