export const Name = 'radius';

export function Config() {
	return {
		radius: "3px",
		keepTopRightAvatar: true,
	};
}

export function InitConfigView(globalConf) {
	document.getElementById('radiusUpdate').addEventListener('click', (event) => {
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
	});
}

export function ConfigView() {
	return `
<div class="row">
	<input class="check" type="checkbox" id="radiusUpdate" checked="true">
	<div class="button bad column"></div>
	<p class="text">&rarr;</p>
	<div class="button good"></div>
	<div class="rowcontainer column">
		<p class="text">, radius:</p>
		<input class="textfield" type="text" id="radius" value="3px">
	</div>
</div>
`;
}
