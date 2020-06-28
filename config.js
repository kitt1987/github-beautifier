'use strict';

import * as Radius from './renderer/radius/config.js';
import * as Avatar from './renderer/avatar/config.js';

let Modules = [
	Radius, Avatar,
];

let Data = {
};

for (var i = 0; i < Modules.length; i++) {
	let conf = Modules[i].Config();
	for (const key in conf) {
		Data[key] = conf[key];
	}
}

export { Modules, Data };
