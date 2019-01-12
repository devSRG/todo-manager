var fs = require('fs');
var i18n = require('i18n');
var util = require('../util');
var readConfig = util.readConfig;
// eslint-disable-next-line no-unused-vars
var ipcRenderer = require('electron').ipcRenderer;

angular
	.module('todoApp')
	.service('SettingsConfig', SettingsConfig);

function SettingsConfig() {
	var page = 'todo';
	var data = {};
	var config = {};
	var todos = [];

	init();
	setUpLocaleStrings();

	return {
		saveConfig: saveConfig,
		getconfLocale: getconfLocale,
		setconfLocale: setconfLocale,
		getFontSize: getFontSize,
		setFontSize: setFontSize,
		getPage: getPage,
		setPage: setPage,
		data: data,
		todos: todos,
		alert: alert
	};

	function saveConfig() {
		// eslint-disable-next-line no-console
		console.log('Saving config..');
		
		var config_data = angular.toJson(config, true);
		fs.writeFileSync('./config.json', config_data, 'utf-8');
	}

	function getconfLocale() {
		return config.user_locale;
	}

	function setconfLocale(locale) {
		// eslint-disable-next-line no-console
		console.log('locale', locale);
		config.user_locale = locale;
		i18n.setLocale(locale);

		setUpLocaleStrings();
	}

	function getFontSize() {
		// eslint-disable-next-line no-console
		console.log('font', config.font_size);
		return config.font_size;
	}

	function setFontSize(size) {
		config.font_size = size;
		var body = document.getElementsByTagName('body')[0];
		if(config.font_size == 'Small') {
			body.style = 'font-size: 14px;';
		} else if (config.font_size == 'Medium') {
			body.style = 'font-size: 16px;';
		} else {
			body.style = 'font-size: 18px;';
		}
	}

	function getPage() {
		return page;
	}

	function setPage(current_page) {
		page = current_page;
	}
	// eslint-disable-next-line no-unused-vars
	function alert(msg) {

	}

	function init() {
		var i18nOpts = {
			defaultLocale: 'en-US',
			locales: ['en-US', 'sl-LK'],
			directory: __dirname + '/../../locales'
		};
		i18n.configure(i18nOpts);

		readConfig(function(result) {
			config = result;
		});

		setconfLocale(config.user_locale);
		setFontSize(config.font_size);
	}

	function setUpLocaleStrings() {
		data.title      = i18n.__('title');
		data.todo       = i18n.__('todo');
		data.new_todo   = i18n.__('new_todo');
		data.completed  = i18n.__('completed');
		data.settings   = i18n.__('settings');
		data.btn_enter  = i18n.__('btn_enter');
		data.logout     = i18n.__('logout');
		data.add_todo   = i18n.__('add_todo');
	}
}
