chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set({updateRadius: true, radius: "3px", keepTopRightAvatar: true});
});
