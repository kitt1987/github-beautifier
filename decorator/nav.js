let Nav = {
	Name: 'centralizeNav',
	Config: () => {
		return {
			centralizeNav: true,
		};
	},
	InitConfigView: InitConfigView,
	ConfigView: ConfigView,
	Enable: Enable,
};

function InitConfigView(globalConf) {
	document.getElementById('centralizeNav').checked = globalConf.centralizeNav;
	document.getElementById('centralizeNav').addEventListener('click', (event) => {
		globalConf.centralizeNav = event.target.checked
		chrome.storage.local.set(globalConf);
		if (!globalConf.centralizeNav) {
			chrome.tabs.reload();
			return;
		}

		chrome.tabs.executeScript({
	      code: 'alignNavToCenter();'
	    });
	});
}

function ConfigView() {
	return `
<div class="row">
	<div class="column">
		<input class="check" type="checkbox" id="centralizeNav" checked="true">
		<p class="text column">Centralize Navgator</p>
	</div>
	<div class="column c2">
		<div class="navbar nl">
			<label class="nactive">&lt;&gt;</label>
		</div>
		<p class="text">&rarr;</p>
		<div class="navbar nc">
			<label class="nactive">&lt;&gt;</label>
		</div>
	</div>
</div> 
`;
}

function Enable(data) {
	alignNavToCenter();
	window.addEventListener('resize', () => {alignNavToCenter();});
}

function alignNavToCenter() {
	let main = document.getElementById("js-repo-pjax-container");
	if (!main) {
		console.log("main view not found");
		return;
	}

	let nav = main.getElementsByClassName("UnderlineNav-body");
	if (!nav || nav.length == 0) {
		console.log("nav bar not found!");
		return;
	}

	let repo = main.getElementsByClassName("repository-content");
	if (!repo || repo.length == 0) {
		console.log("repo view not found!");
		return;
	}

	nav[0].style.paddingLeft = (repo[0].offsetLeft-nav[0].offsetLeft) + "px";
}
