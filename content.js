window.onload = () => {
	console.log("window.load");
};

window.addEventListener('DOMContentLoaded', (event) => {
	// console.log("DOMContentLoaded");

	// chrome.tabs.insertCSS({
	// 	code: `.UnderlineNav-body {
	// 		padding-left: 256px;
	// 	}`,
	// });

	// Config.Load(() => {
	// 	for (var i = 0; i < Config.Modules.length; i++) {
	// 		let mo = Config.Modules[i];
	// 		if (Config.Data[mo.Name]) {
	// 			mo.Enable(Config.Data);
	// 		}
	// 	}
	// });

	// window.alert('wait');

	for (var i = 0; i < Config.Modules.length; i++) {
		let mo = Config.Modules[i];
		if (Config.Data[mo.Name]) {
			mo.Enable(Config.Data);
		}
	}

	let repo = document.querySelector(".repository-content");
	if (!repo) {
		console.log("repo view not found!");
		return;
	}

}, { capture: true });

// window.addEventListener('DOMContentLoaded', (event) => {
// 	console.log("DOMContentLoaded");

// 	chrome.tabs.insertCSS({
// 		code: `.UnderlineNav-body {
// 			padding-left: 256px;
// 		}`,
// 	});

// 	Config.Load(() => {
// 		for (var i = 0; i < Config.Modules.length; i++) {
// 			let mo = Config.Modules[i];
// 			if (Config.Data[mo.Name]) {
// 				mo.Enable(Config.Data);
// 			}
// 		}
// 	});

// 	window.alert('wait');

// 	for (var i = 0; i < Config.Modules.length; i++) {
// 		let mo = Config.Modules[i];
// 		if (Config.Data[mo.Name]) {
// 			mo.Enable(Config.Data);
// 		}
// 	}


// }, { capture: true });
// message
// {
// 	func: "function name",
// 	args: [ object ],
// }

chrome.runtime.onMessage.addListener(
	function(message) {
		console.log(message);
		console.log(window[message.func]);
		window[message.func](message.args);
	}
);

chrome.runtime.sendMessage('init');
