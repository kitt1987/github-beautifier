function isEmptyRadius(radius) {
	return radius == "" || radius == "0" || radius == "0px"
}

function ignoreSelector(selector) {
	// FIXME use hashtable here
	let exceptedSelectors = [".notification-indicator", ".repo-language-color"];

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
}

console.log("radius loaded");
