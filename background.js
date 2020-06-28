'use strict';

import * as Config from './config.js';

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set(Config.Data);
	console.log("initial configuration:" + Config.Data);
});
