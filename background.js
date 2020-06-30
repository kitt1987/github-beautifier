chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set(Config.Data);
	console.log("initial configuration:");
	console.log(Config.Data);
	// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	// 	console.log("tab" + tabId + "updated");
	// 	if (!tab.active) {
	// 		return;
	// 	}

	// 	if (changeInfo.status != "loading") {
	// 		return;
	// 	}

	// 	if (tab.url != null && tab.url.match(/https?:\/\/.*\.?github\.com.*/)) {
	// 		chrome.tabs.insertCSS(tabId, {
	// 			code: `.UnderlineNav-body {
	// 				padding-left: 256px;
	// 			}`,
	// 		}, null);
	// 	}
	// });

	chrome.storage.onChanged.addListener(
 		(changes, areaName) => {
 			if (areaName != "local") {
 				return;
 			}

 			console.log(changes.oldValue);
 			console.log(changes.newValue);
 			Config.Data = changes.newValue;
 			for (let i = 0; i < Config.Modules.length; i++) {
 				if (changes.oldValue[Config.Modules[i].Name] == changes.newValue[Config.Modules[i].Name]) {
 					continue;
 				}

 				if (changes.newValue[Config.Modules[i].Name]) {
 					// setup content script rule
 					chrome.declarativeContent.onPageChanged.removeRules(Config.Modules[i].RuleID, () => {
				    	chrome.declarativeContent.onPageChanged.addRules([Config.Modules[i].CreateContentRule()], (rule) => {
				    		Config.Modules[i].RuleID = rule.id;
				    	});
				    });

				    // apply to tabs
				    chrome.tabs.query({ url: '*://*.github.com/*'}, (tabs) => {
				    	for (let j = 0; j < tabs.length; j++) {
				    		chrome.tabs.executeScript(tabs[j].id, { file: Config.Modules[i].ContentScript});
				    	}
				    });
 					continue
 				}

 				// FIXME disable it
 				chrome.declarativeContent.onPageChanged.removeRules(Config.Modules[i].RuleID);
 				// apply to tabs, run disable script
 				chrome.tabs.query({ url: '*://*.github.com/*'}, (tabs) => {
			    	for (let j = 0; j < tabs.length; j++) {
			    		chrome.tabs.executeScript(tabs[j].id, { code: Config.ContentDisableFuncName(Config.Modules[i]) });
			    	}
			    });
 			}
 		}
 	);

 	for (let i = 0; i < Config.Modules.length; i++) {
 		if (Config.Data[Config.Modules[i].Name]) {
 			chrome.declarativeContent.onPageChanged.removeRules(Config.Modules[i].RuleID, () => {
		    	chrome.declarativeContent.onPageChanged.addRules([Config.Modules[i].CreateContentRule()], (rules) => {
		    		Config.Modules[i].RuleID = rules[0].id;
		    		console.log("load rules for decorator " + Config.Modules[i].Name + ":" + Config.Modules[i].RuleID);
		    	});
		    });
 		}
	}

 	// chrome.runtime.onMessage.addListener(
 	// 	function(message, sender) { 
 	// 		console.log("got message " + message);			
 	// 		switch (message) {
 	// 			case 'init':
 	// 				Config.LoadAndInitDecorator(sender.tab.id);
 	// 				break;

 	// 			default:
 	// 				console.log('unknown message ' + message);
 	// 				return;
 	// 		}
 	// 	}
 	// );
});
