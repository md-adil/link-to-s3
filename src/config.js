const homedir = require('os').homedir(),
	path = require('path'),
	fs = require('fs'),
	filename = path.join(homedir, '.link-to-s3.json'),
	stat = Promise.promisify(fs.stat);

const readline = require('readline');

const ask = q => new Promise((res, rej) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question(q, (a) => {
		rl.close();
		res(a);
	});
});

exports.ask = async () => {
	const key = await ask('AWS Secret Key: ');
	const secret = await ask('AWS Secret Token: ');
	const settings = { key, secret };
	Object.assign(exports, settings);
	fs.writeFileSync(filename, JSON.stringify(settings));
}

exports.exists = () => {
	const status = fs.existsSync(filename);
	if(status) {
		exports.load();
	}
	return status;
}

exports.load = () => {
	Object.assign(exports, JSON.parse(fs.readFileSync(filename)));
}
