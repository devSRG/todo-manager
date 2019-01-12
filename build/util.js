var fs = require('fs');
// eslint-disable-next-line no-unused-vars
var path = require('path');

function saveJSON(path, data) {
    var json_data = angular.toJson(data, true);
    
	fs.writeFileSync(path, json_data, 'utf8');
}

function readJSON(path, cb) {
    fs.stat(path, function (err) {
		if (err == null) {
			fs.readFile(path, 'utf8', function (err, data) {
				if (err) throw err;
				
				var json_data = JSON.parse(data, 4);

				if(cb instanceof Function) {
					cb(json_data);
				} else {
					return json_data;
				}
			});
		} else if(err.code == 'ENOENT') {
			return null;
		}
	});
}

function saveConfig(config) {
	// eslint-disable-next-line no-console
	console.log('Saving config..');

	saveJSON('./config.json', config);
}

function readConfig(cb) {
	fs.stat('./config.json', function (err) {
		if (err == null) {
			fs.readFile('./config.json', 'utf8', function (err, data) {
				if (err) throw err;
				var config_data = JSON.parse(data);

				if(cb instanceof Function) {
					cb(config_data);
				} else {
					return config_data;
				}
			});
		} else if (err.code == 'ENOENT') {
			// eslint-disable-next-line no-console
			console.log('Missing config file.')
			return null;
		} else {
			throw err;
		}
	});
}

module.exports = {
    saveJSON: saveJSON,
	readJSON: readJSON,
	saveConfig: saveConfig,
    readConfig: readConfig
};