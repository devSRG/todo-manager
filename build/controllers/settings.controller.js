angular
	.module('todoApp')
	.controller('SettingsController', SettingsController);

function SettingsController($scope, settings) {
	var vm = this;

	/*vm.keymaps = [
		{
			def: 'Close window',
			com: 'Alt + F4'
		},
		{
			def: 'Copy',
			com: 'Alt + C'
		}
	];*/
	/*vm.themes = [
		{
			name: 'light',
			color: '#ededed'
		},
		{
			name: 'dark',
			color: '#444'
		}
	];*/
	vm.keymaps = [];
	vm.themes = [];
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
	// eslint-disable-next-line no-console
	console.log('DATA', vm.lang, vm.font_size);

	function changeLang(language) {
		settings.setconfLocale(language);
		settings.saveConfig();
		
		// eslint-disable-next-line no-console
		console.log('language', language);
	}

	function changeFontSize(size) {
		settings.setFontSize(size);
		settings.saveConfig();

		// eslint-disable-next-line no-console
		console.log('font size', size);
	}
}

SettingsController.$inject = ['$scope','SettingsConfig'];
