let Config = {
	Modules: [ Radius, Nav, Avatar ],
	Data: {},
	Load: (cb) => {
		chrome.storage.local.get(null, (result) => {
			console.debug(result);
			if (result) {
				Config.Data = result;
			}

			cb();
		});
	},
};

for (var i = 0; i < Config.Modules.length; i++) {
	let conf = Config.Modules[i].Config();
	for (const key in conf) {
		Config.Data[key] = conf[key];
	}
}