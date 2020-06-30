function keepRawAvatarStyle() {
	let avatars = document.getElementsByClassName('avatar avatar-user')
	for (let i = 0; i < avatars.length; i++) {
		let avatar = avatars[i];
		if (avatar.className.trim() == 'avatar avatar-user') {
			avatar.style.borderRadius = "50%";
		}
	}
}

function updateAvatarStyle(radius) {
	let avatars = document.getElementsByClassName('avatar avatar-user')
	for (let i = 0; i < avatars.length; i++) {
		let avatar = avatars[i];
		if (avatar.className.trim() == 'avatar avatar-user') {
			avatar.style.borderRadius = radius;
		}
	}
}

console.log("avatar loaded");
