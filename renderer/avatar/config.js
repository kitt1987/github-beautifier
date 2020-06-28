export const Name = 'avatar';

export function Config() {
	return {
		keepTopRightAvatar: true,
	};
}

export function InitConfigView(globalConf) {
	document.getElementById('keepTopRightAvatar').addEventListener('click', (event) => {
		globalConf.keepTopRightAvatar = event.target.checked
		chrome.storage.local.set(globalConf);
		if (!globalConf.keepTopRightAvatar) {
			chrome.tabs.executeScript({
		      code: 'updateAvatarStyle("' + globalConf.radius + '");'
		    });
			return;
		}

		chrome.tabs.executeScript({
	      code: 'keepRawAvatarStyle();'
	    });
	});
}

export function ConfigView() {
	return `
<div class="row">
	<input class="check" type="checkbox" id="keepTopRightAvatar" checked="true">
	<p class="text column">Keep the top right avatar</p>
</div> 
`;
}
