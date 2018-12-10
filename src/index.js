global.Promise = require('bluebird');
const fs = require('fs'),
	config = require()

if(!await config.exists()) {
	await config.ask();
}
