let Avatar = {
	Name: 'keepTopRightAvatar',
	Config: () => {
		return {
			keepTopRightAvatar: true,
		};
	},
	InitConfigView: InitConfigView,
	ConfigView: ConfigView,
	Enable: Enable,
};

function InitConfigView(globalConf) {
	document.getElementById('keepTopRightAvatar').checked = globalConf.keepTopRightAvatar;
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

function ConfigView() {
	return `
<div class="row">
	<input class="check" type="checkbox" id="keepTopRightAvatar" checked="true">
	<p class="text column">Keep the top right avatar</p>
</div> 
`;
}

function Enable(data) {
	keepRawAvatarStyle();
}

function keepRawAvatarStyle() {
	let header = document.getElementsByClassName("Header");
	if (!header || header.length == 0) {
		console.log("header view not found");
		return;
	}

	console.log(header);

	let avatars = header[0].getElementsByClassName('avatar avatar-user')
	for (let i = 0; i < avatars.length; i++) {
		let avatar = avatars[i];
		if (avatar.className.trim() == 'avatar avatar-user') {
			avatar.style.borderRadius = "50%";
		}
	}
}

function updateAvatarStyle(radius) {
	let header = document.getElementsByClassName("Header");
	if (!header || header.length == 0) {
		console.log("header view not found");
		return;
	}

	let avatars = header[0].getElementsByClassName('avatar avatar-user')
	for (let i = 0; i < avatars.length; i++) {
		let avatar = avatars[i];
		if (avatar.className.trim() == 'avatar avatar-user') {
			avatar.style.borderRadius = radius;
		}
	}
}
