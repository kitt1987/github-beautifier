window.onload = (event) => {
	chrome.storage.local.get(['keepTopRightAvatar'], function(result) {
		if (result.keepTopRightAvatar) {
			keepRawAvatarStyle();
		}
	});

	chrome.storage.local.get(['updateRadius'], function(result) {
		console.log("update radius is " + result.updateRadius);
		if (result.updateRadius) {
			chrome.storage.local.get(['radius'], function(result) {
				console.log("radius is " + result.radius);
				updateRadius(result.radius);
			});
		}
	});
};
