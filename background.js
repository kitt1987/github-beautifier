// var declarativeContent = chrome.declarativeContent;
// var PageStateMatcher = declarativeContent.PageStateMatcher;
// var SetIcon = declarativeContent.SetIcon;

// var iconRule = {
//     conditions: [
//       new PageStateMatcher({
//         pageUrl: { hostSuffix: 'github.com' },
//       })
//     ],
//     actions: [ new SetIcon({
    	// path: {
    	// 	"16": "icon/active32.png",
		   //  "32": "icon/active32.png",
		   //  "48": "icon/active64.png",
		   //  "128": "icon/active128.png"
    	// },
//     }) ]
// };

// var context = this;
// var onPageChanged = chrome.declarativeContent.onPageChanged;
// onPageChanged.removeRules(undefined, function() {
// 	onPageChanged.addRules.apply(context, [iconRule]);
// });

chrome.tabs.onActivated.addListener(function(activeInfo) {
	// activeInfo.tabId  activeInfo.windowId
	chrome.tabs.get(activeInfo.tabId, updateIcon);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	updateIcon(tab);
});

function updateIcon(tab) {
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
		});
	}
}
