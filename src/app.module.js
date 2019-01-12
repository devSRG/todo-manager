var ipcRenderer = require('electron').ipcRenderer;

angular
	.module('app', [])
	.run(Init);

function Init($rootScope) {
	$rootScope.title = 'To do Manager';
	$rootScope.close = close;
	$rootScope.minimize = minimize;
	$rootScope.maximize = maximize;

	function close() {
		ipcRenderer.send('close-window');
	}

	function minimize() {
		ipcRenderer.send('minimize-window');
	}

	function maximize() {
		ipcRenderer.send('maximize-window');
	}
}

Init.$inject = ['$rootScope'];
