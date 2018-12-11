global.Promise = require('bluebird');
const fs = require('fs'),
	config = require('./config');

(async () => {
	if(!config.exists()) {
		await config.ask();
	}
	console.log(config);
})();

