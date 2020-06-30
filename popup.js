window.onload = (event) => {
	console.log(`${Config.Modules.length} decorators found`);
	Config.Load(() => {
		let container = document.getElementById('container');
		let containerContent = "";
		for (var i = 0; i < Config.Modules.length; i++) {
			console.log(`render config view for render ` + Config.Modules[i].Name);
			containerContent += Config.Modules[i].ConfigView();
		};

		container.innerHTML = containerContent

		for (var i = 0; i < Config.Modules.length; i++) {
			console.log(`initialize config view for render ` + Config.Modules[i].Name);
			Config.Modules[i].InitConfigView(Config.Data);
		};
	});	
};
