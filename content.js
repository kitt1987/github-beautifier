window.onload = (event) => {
	Config.Load(() => {
		for (var i = 0; i < Config.Modules.length; i++) {
			let mo = Config.Modules[i];
			if (Config.Data[mo.Name]) {
				mo.Enable(Config.Data);
			}
		}
	});
};
