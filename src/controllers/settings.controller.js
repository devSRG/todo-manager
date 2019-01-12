var util = require('../util');

var saveConfig = util.saveConfig;

angular
	.module('todoApp')
	.controller('SettingsController', SettingsController);

function SettingsController($scope, settings) {
	var vm = this;

	vm.locales = ['en-US', 'sl-LK'];
	vm.locale = 'en-US';
	vm.lang = settings.getconfLocale();
	vm.font_sizes = ['Small', 'Medium', 'Large'];
	vm.font_size  = settings.getFontSize();
	vm.changeLang = changeLang;
	vm.changeFontSize = changeFontSize;
	vm.enable_maximize = settings.maximize;
	vm.toggleMaximize = settings.toggleMaximize;

	$scope.$watch(function() {
		vm.font_size = settings.getFontSize();
	});

	function changeLang(language) {
		settings.setconfLocale(language);
		saveConfig(settings.config);
		
		// eslint-disable-next-line no-console
		console.log('language', language);
	}

	function changeFontSize(size) {
		settings.setFontSize(size);
		saveConfig(settings.config);

		// eslint-disable-next-line no-console
		console.log('font size', size);
	}
}

SettingsController.$inject = ['$scope','SettingsConfig'];
