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
	updateAvatarPopupView(globalConf);
	document.getElementById('keepTopRightAvatar').addEventListener('click', (event) => {
		globalConf.keepTopRightAvatar = event.target.checked
		chrome.storage.local.set(globalConf);
		updateAvatarPopupView(globalConf);
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

function updateAvatarPopupView(globalConf) {
	if (globalConf.keepTopRightAvatar) {
		document.getElementById('disableAvatar').style.display = "none";
		document.getElementById('enabbleAvatar').style.display = "flex";
	} else {
		document.getElementById('enabbleAvatar').style.display = "none";
		document.getElementById('disableAvatar').style.display = "flex";
		document.getElementById('disableAvatar').style.borderRadius = globalConf.radius;
	}
}

function ConfigView() {
	return `
<div class="row">
	<div class="column">
		<input class="check" type="checkbox" id="keepTopRightAvatar" checked="true">
		<p class="text column">Keep the top right avatar</p>
	</div>
	<div class="column c2 avatarBG">
		<img id="disableAvatar" class="avatar" src="https://avatars2.githubusercontent.com/u/760562?s=60&amp;v=4" style="display: none;">
		<img id="enabbleAvatar" class="avatar" src="https://avatars2.githubusercontent.com/u/760562?s=60&amp;v=4" style="display: none;">
		<span class="dropdown-caret"></span>
	</div>
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
