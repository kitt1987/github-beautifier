window.onload = (event) => {
	console.log(`${Config.Modules.length} renderers found`);
	Config.Load(() => {
		for (var i = 0; i < Config.Modules.length; i++) {
			let mo = Config.Modules[i];
			console.log(`render config view for render ` + mo.Name);
			let container = document.getElementById('container');
			container.innerHTML += mo.ConfigView();
			mo.InitConfigView(Config.Data);
		};
	});	
};
