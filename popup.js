'use strict';

// function toggleRadiusUpdate(event) {
// 	globalConf.radius = document.getElementById('radius').value;
// 	globalConf.updateRadius = event.target.checked
// 	chrome.storage.local.set(globalConf);
// 	if (!globalConf.updateRadius) {
// 		chrome.tabs.reload();
// 		return;
// 	}
	
//   	chrome.tabs.executeScript({
//       code: 'updateRadius("' + globalConf.radius + '");'
//     });
// }

// function toggleCornorAvator(event) {
	// globalConf.keepTopRightAvatar = event.target.checked
	// chrome.storage.local.set(globalConf);
	// if (!globalConf.keepTopRightAvatar) {
	// 	chrome.tabs.executeScript({
	//       code: 'updateAvatarStyle("' + globalConf.radius + '");'
	//     });
	// 	return;
	// }

	// chrome.tabs.executeScript({
 //      code: 'keepRawAvatarStyle();'
 //    });
// }

import * as Config from './config.js';

window.onload = (event) => {
	console.log(`${Config.Modules.length} renderers found`);
	for (var i = 0; i < Config.Modules.length; i++) {
		let mo = Config.Modules[i];
		console.log(`render config view for render ` + mo.Name);
		let container = document.getElementById('container');
		container.innerHTML += mo.ConfigView();
		mo.InitConfigView(Config.Data);
	};

	// document.getElementById('radiusUpdate').addEventListener('click', toggleRadiusUpdate);
	// document.getElementById('keepTopRightAvatar').addEventListener('click', toggleCornorAvator);
	
	// chrome.storage.local.get(null, (result) => { globalConf = result });

	// chrome.storage.local.get(['radius'], function(result) {
	// 	globalConf.radius = result.radius;
	// 	document.getElementById('radius').value = result.radius;
	// });

	// chrome.storage.local.get(['updateRadius'], function(result) {
	// 	globalConf.updateRadius = result.updateRadius;
	// 	document.getElementById('radiusUpdate').checked = result.updateRadius;
	// });

	// chrome.storage.local.get(['keepTopRightAvatar'], function(result) {
	// 	globalConf.keepTopRightAvatar = result.keepTopRightAvatar;
	// 	document.getElementById('keepTopRightAvatar').checked = result.keepTopRightAvatar;
	// });
};

