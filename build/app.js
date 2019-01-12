'use-strict';

var app = angular.module('todoApp', ['mp.datePicker', 'CustomDatePicker']);

var ipcRenderer = require('electron').ipcRenderer,
	fs = require('fs');

var i18n = require('i18n');

var i18nOpts = {
	defaultLocale: 'en-US',
	locales: ['en-US', 'sl-LK'],
	directory: __dirname + '/../../locales'
};

i18n.configure(i18nOpts);
// eslint-disable-next-line no-unused-vars
app.controller('welcome', function($rootScope, $scope, config_locale) {
	$scope.page = 'todo';
	$scope.todos = [];
	$scope.tf = null;
	//eslint-disable-next-line no-unused-vars
	$scope.add = function(task) {
		if($scope.task != '' && $scope.task != null) {
			$scope.todos.push({'title': $scope.task,'duration': 3, 'completed': false});
		}
	};
	$scope.remove = function(index) {
		$scope.todos.splice(index, 1);
	};
	$scope.close = function() {
		saveJSON($scope.todos);
		ipcRenderer.send('close-window');
	};
	$scope.minimize = function() {
		ipcRenderer.send('minimize-window');
	};
	$scope.maximize = function() {
		ipcRenderer.send('maximize-window');
	};
	$scope.toggle = function(index) {
		$scope.tf = index;
	};
	$scope.task = '';
	$scope.edit = function(index){
		$scope.task = $scope.todos[index].title;
	};
	fs.stat('./todo.json', function(err) {
		// eslint-disable-next-line no-console
		console.time();
		if(err == null) {
			fs.readFile('./todo.json', function(err, data) {
				if(err) throw err;
				$scope.todos = JSON.parse(data);
				$scope.$apply();
				// eslint-disable-next-line no-console
				console.log($scope.todos);
			});
		}
		// eslint-disable-next-line no-console
		console.timeEnd();
	});
	$scope.lang = i18n.getLocale();
	$scope.$watch('user_locale', function() {
		$scope.title = i18n.__('title');
		$scope.todo = i18n.__('todo');
		$scope.completed = i18n.__('completed');
		$scope.settings = i18n.__('settings');
		$scope.btn_enter = i18n.__('btn_enter');
		// eslint-disable-next-line no-console
		console.log('test', $scope.completed, i18n.getLocale());
	});
});

app.controller('settings', function($rootScope, $scope, config_locale) {
	$scope.keymaps = [{'def': 'Close window', 'com': 'alt + f4'},{'def': 'Copy', 'com': 'alt + c'}];
	$scope.locales = ['en-US', 'sl-LK'];
	$scope.lang = 'en-US';
	$scope.changeLang = function(language) {
		config_locale.setconfLocale(language);
	};
});

app.service('config_locale', function($rootScope) {
	$rootScope.user_locale = 'en-US';
	function setconfLocale(locale) {
		$rootScope.user_locale = locale;
		i18n.setLocale(locale);
	}
	function getconfLocale() {
		return $rootScope.user_locale;
	}
	return {
		setconfLocale: setconfLocale,
		getconfLocale: getconfLocale
	};
});

function saveJSON(data) {
	data = angular.toJson(data, true);
	// eslint-disable-next-line no-console
	console.log('Saving latest todo list!', data);
	// eslint-disable-next-line no-console
	console.time();
	fs.writeFileSync('todo.json', data, 'utf-8');
	// eslint-disable-next-line no-console
	console.timeEnd();
}
