window.onload = () => {
	console.log(`${Config.Modules.length} decorators found`);
	Config.Load(() => {
		let container = document.getElementById('container');
		let containerContent = "";
		for (var i = 0; i < Config.Modules.length; i++) {
			console.log(`render config view for render ` + Config.Modules[i].Name);
			containerContent += Config.Modules[i].Config.View();
		};

		container.innerHTML = containerContent

		for (var i = 0; i < Config.Modules.length; i++) {
			console.log(`initialize config view for render ` + Config.Modules[i].Name);
			Config.Modules[i].Config.Init(Config.Data);
		};
	});
	document.getElementById("repo").addEventListener('click', (event) => {
		chrome.tabs.create({ url: "https://github.com/kitt1987/github-beautifier" });
	});
};
