chrome.tabs.onActivated.addListener(function(activeInfo) {
	// activeInfo.tabId  activeInfo.windowId
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		if (chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
			return;
		}

		updateIcon(tab);
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status != 'unloaded') {
		updateIcon(tab);
	}
});

function updateIcon(tab) {
	if (tab.url == '') {
		return;
	}

	const u = new URL(tab.url);
	if (u.hostname.endsWith('github.com')) {
		chrome.pageAction.setIcon({
			tabId: tab.id, 
			path: {
		          "16": "icon/active32.png",
		          "32": "icon/active32.png",
		          "48": "icon/active64.png",
		          "128": "icon/active128.png"
		    }
		}, () => {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError.message);
				return;
			}

			chrome.pageAction.show(tab.id, () => {
				if (chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError.message);
					return;
				}
			});
		});
	}
}
