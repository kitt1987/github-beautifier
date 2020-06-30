var Config = {
	Modules: [ CentralizeNav ],
	Data: {},
	Load: (cb) => {
		chrome.storage.local.get(null, (result) => {
			if (result) {
				Config.Data = result;
			}

			cb();
		});
	},
	LoadAndInitDecorator: (tabID) => {
		for (var i = 0; i < Config.Modules.length; i++) {
			chrome.tabs.executeScript({ file: "decorator/" + Config.Modules[i].Name.toLowerCase() + ".js" }, (resp) => {
				console.debug("script loaded:" + resp);
			});
		}

		chrome.tabs.executeScript({ file: "config.js" }, (resp) => {
			console.debug("load config.js");
			for (var i = 0; i < Config.Modules.length; i++) {
				chrome.tabs.sendMessage(tabID, { func: Config.ContentInitFuncName(Config.Modules[i]), args: Config.Data });
			}
		});
	},
	ContentInitFuncName: (decorator) => { return 'Init' + decorator.Name ;},
	ContentEnableFuncName: (decorator) => { return 'Enable' + decorator.Name ;},
	ContentDisableFuncName: (decorator) => { return 'Disable' + decorator.Name ;},
};

for (let i = 0; i < Config.Modules.length; i++) {
	Config.Data[Config.Modules[i].Name] = Config.Modules[i].Config.Data;
}
