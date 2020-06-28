'use strict';

function toggleRadiusUpdate(event) {
	globalConf.radius = document.getElementById('radius').value;
	globalConf.updateRadius = event.target.checked
	chrome.storage.local.set(globalConf);
	if (!globalConf.updateRadius) {
		chrome.tabs.reload();
		return;
	}
	
  	chrome.tabs.executeScript({
      code: 'updateRadius("' + globalConf.radius + '");'
    });
}

function toggleCornorAvator(event) {
	globalConf.keepTopRightAvatar = event.target.checked
	chrome.storage.local.set(globalConf);
	if (!globalConf.keepTopRightAvatar) {
		chrome.tabs.reload();
		return;
	}

	chrome.tabs.executeScript({
      code: 'keepRawAvatarStyle();'
    });
}

let globalConf = {
	radius: "3px",
	keepTopRightAvatar: true,
	updateRadius: true,
}

window.onload = (event) => {
	document.getElementById('radiusUpdate').addEventListener('click', toggleRadiusUpdate);
	document.getElementById('keepTopRightAvatar').addEventListener('click', toggleCornorAvator);
	
	chrome.storage.local.get(['radius'], function(result) {
		globalConf.radius = result.radius;
		document.getElementById('radius').value = result.radius;
	});

	chrome.storage.local.get(['updateRadius'], function(result) {
		globalConf.updateRadius = result.updateRadius;
		document.getElementById('radiusUpdate').checked = result.updateRadius;
	});

	chrome.storage.local.get(['keepTopRightAvatar'], function(result) {
		globalConf.keepTopRightAvatar = result.keepTopRightAvatar;
		document.getElementById('keepTopRightAvatar').checked = result.keepTopRightAvatar;
	});
};

