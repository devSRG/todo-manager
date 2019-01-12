var fs = require('fs');

function saveJSON(path, data) {
    var json_data = angular.toJson(data, true);
    
	fs.writeFileSync(path, json_data, 'utf8');
}

function readJSON(path, cb) {
    fs.stat(path, function (err) {
		if (err == null) {
			fs.readFile(path, 'utf8', function (err, data) {
				if (err) throw err;
				
				var json_data = JSON.parse(data);

				if(cb instanceof Function) {
					cb(json_data);
				} else {
					return json_data;
				}
			});
		}
	});
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
		} else {
			throw err;
		}
	});
}

module.exports = {
    saveJSON: saveJSON,
    readJSON: readJSON,
    readConfig: readConfig
};