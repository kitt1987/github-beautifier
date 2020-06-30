let CentralizeNav = {
	Name: 'CentralizeNav',
	Config: {
		Data: true,
		View: function() {
			return `<div class="row">
						<div class="column">
							<input class="check" type="checkbox" id="centralizeNav" checked="true">
							<p class="text column">Centralize Navgator</p>
						</div>
						<div class="column c2">
							<div id="disableCentralizeNav" class="navbar nl" style="display: none">
								<label class="nactive">&lt;&gt;</label>
							</div>
							<div id="enableCentralizeNav" class="navbar nc" style="display: none">
								<label class="nactive">&lt;&gt;</label>
							</div>
						</div>
					</div> 
					`;
		},
		Init: (globalConf) => {
			document.getElementById('centralizeNav').checked = globalConf[CentralizeNav.Name];
			updateNavPopupView(globalConf);

			document.getElementById('centralizeNav').addEventListener('click', (event) => {
				globalConf[CentralizeNav.Name] = event.target.checked
				chrome.storage.local.set(globalConf);
				updateNavPopupView(globalConf);
			});
		},
	},
	ContentScript: 'decorator/nav/content.js',
	CreateContentRule: () => {
		return {
			conditions: [
			  new chrome.declarativeContent.PageStateMatcher({
			    pageUrl: { hostSuffix: 'github.com' },
			    css: ['UnderlineNav-body']
			  }),
			],
			actions: [ new chrome.declarativeContent.RequestContentScript({ js: ['decorator/nav/content.js'] }) ]
		};
	},
};

function updateNavPopupView(globalConf) {
	if (globalConf[CentralizeNav.Name]) {
		document.getElementById('disableCentralizeNav').style.display = "none";
		document.getElementById('enableCentralizeNav').style.display = "flex";
	} else {
		document.getElementById('enableCentralizeNav').style.display = "none";
		document.getElementById('disableCentralizeNav').style.display = "flex";
	}
}
