let Radius = {
	Name: 'updateRadius',
	Config: () => {
		return {
			radius: "3px",
			updateRadius: true,
		};
	},
	InitConfigView: InitConfigView,
	ConfigView: ConfigView,
	Enable: Enable,
};

function InitConfigView(globalConf) {
	document.getElementById('radiusUpdate').checked = globalConf.updateRadius;
	document.getElementById('radius').value = globalConf.radius;
	document.getElementById('radiusUpdate').addEventListener('click', (event) => {
		globalConf.radius = document.getElementById('radius').value;
		globalConf.updateRadius = event.target.checked
		chrome.storage.local.set(globalConf);
		if (!globalConf.updateRadius) {
			chrome.tabs.reload();
			return;
		}
		
	  	chrome.tabs.executeScript({
	      code: 'updateRadius("' + globalConf.radius + '")'
	    });
	});

	document.getElementById('radius').addEventListener('change', (event) => {
		globalConf.radius = event.target.value;
		chrome.storage.local.set(globalConf);
		if (globalConf.updateRadius) {
			chrome.tabs.executeScript({
		      code: 'updateRadius("' + globalConf.radius + '")'
		    });
		}
	});
}

function ConfigView() {
	return `
<div class="row">
	<div class="column">
		<input class="check" type="checkbox" id="radiusUpdate" checked="true">
		<p class="text">border_radius:</p>
		<input class="textfield" type="text" id="radius" value="3px">
	</div>
	<div class="column c2">
		<div class="button bad column"></div>
		<p class="text arrow">&rarr;</p>
		<div class="button good"></div>
	</div>
</div>
`;
}

function Enable(data) {
	updateRadius(data["radius"]);
}

function isEmptyRadius(radius) {
	return radius == "" || radius == "0" || radius == "0px"
}

function ignoreSelector(selector) {
	let exceptedSelectors = [
		".notification-indicator",
		".repo-language-color",
		".discussion-item-icon",
		".TimelineItem-badge",
	];

	for (let i = 0; i < exceptedSelectors.length; i++) {
		if (selector.includes(exceptedSelectors[i])) {
			return true;
		}
	}

	return false;
}

function updateRadius(radius) {
	for (let i = 0; i < document.styleSheets.length; i++) {
		let styleSheet = document.styleSheets[i];

		for (let j = 0; j < styleSheet.cssRules.length; j++) {
			let rule = styleSheet.cssRules[j]
			if (rule.type != CSSRule.STYLE_RULE) {
				continue;
			}

			if (ignoreSelector(rule.selectorText)) {
				continue;
			}

			if (!isEmptyRadius(rule.style.borderRadius)) {
				if (rule.style.borderRadius.includes(' ')) {
					continue;
				}

				document.styleSheets[i].cssRules[j].style.borderRadius = radius;
			}

			if (!isEmptyRadius(rule.style.borderTopLeftRadius)) {
				if (rule.style.borderTopLeftRadius.includes(' ')) {
					continue;
				}

				document.styleSheets[i].cssRules[j].style.borderTopLeftRadius = radius;
			}

			if (!isEmptyRadius(rule.style.borderTopRightRadius)) {
				if (rule.style.borderTopRightRadius.includes(' ')) {
					continue;
				}

				document.styleSheets[i].cssRules[j].style.borderTopRightRadius = radius;
			}

			if (!isEmptyRadius(rule.style.borderBottomRightRadius)) {
				if (rule.style.borderBottomRightRadius.includes(' ')) {
					continue;
				}

				document.styleSheets[i].cssRules[j].style.borderBottomRightRadius = radius;
			}

			if (!isEmptyRadius(rule.style.borderBottomLeftRadius)) {
				if (rule.style.borderBottomLeftRadius.includes(' ')) {
					continue;
				}

				document.styleSheets[i].cssRules[j].style.borderBottomLeftRadius = radius;
			}
		}
	}

	let status = document.getElementsByClassName("user-status-circle-badge-container");
	if (!status || status.length == 0) {
		console.log("status view not found");
		return;
	}

	status[0].style.marginBottom = "-55px";
}
