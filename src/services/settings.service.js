var i18n = require('i18n');

angular
    .module('todo-app')
    .service('settings', settings);

function settings($rootScope, util, database, constants) {
    this.page = 'todo';
    this.strings = {};
    this.config = {};
    this.todos = [];
    this.settings = {
        locales: [
            {
                label: 'English',
                value: 'en-US'
            },
            {
                label: 'Sinhala',
                value: 'sl-LK'
            }
        ],
        fontSizes: [
            {
                label: 'Small',
                value: 'small'
            },
            {
                label: 'Medium',
                value: 'medium'
            },
            {
                label: 'Large',
                value: 'large'
            }
        ],
        themes: [
            {
                name: 'Dark',
                color: '#888'
            },
            {
                name: 'Light',
                color: '#ddd'
            },
            {
                name: 'Custom',
                color: 'royalblue'
            }
        ]
    };
    this.defaultConfig = {
        locale: this.settings.locales[0].value,
        fontSize: this.settings.fontSizes[1].value,
        theme: this.settings.themes[0].name
    };

    this.initialize = initialize;
    this.getUserLocale = getUserLocale;
    this.setUserLocale = setUserLocale;
    this.getUserFontSize = getUserFontSize;
    this.setUserFontSize = setUserFontSize;
    this.getUserTheme = getUserTheme;
    this.setUserTheme = setUserTheme;
    this.getPage = getPage;
    this.setPage = setPage;
    this.getLocales = getLocales;
    this.getFontSizes = getFontSizes;
    this.getThemes = getThemes;

    function initialize() {
        if (database.isInitialized()) {
            var user = util.localStorage.get('user');

            if (user) {
                user.settings = user.settings || null;

                user.locale !== this.defaultConfig.locale && this.setUserLocale(user.locale);
                user.settings.fontSize !== this.defaultConfig.fontSize && this.setUserFontSize(user.settings.fontSize);
                user.settings.theme !== this.defaultConfig.theme && this.setUserTheme(user.settings.theme);
            }
        }
    }

    function getUserLocale() {
        var locale = this.settings.locales.find(function (locale) {
            return locale.value == this.config.locale;
        }.bind(this));

        if (!locale) {
            locale = this.settings.locales.find(function (locale) {
                return locale.value == this.defaultConfig.locale;
            }.bind(this));
        }

        return locale;
    }

    function setUserLocale(locale) {
        this.config.locale = locale;
        i18n.setLocale(locale);

        $rootScope.$broadcast(constants.EVENT.LOCALE_UPDATED);
    }

    function getUserFontSize() {
        var fontSize = this.settings.fontSizes.find(function (fontSize) {
            return fontSize.value == this.config.fontSize;
        }.bind(this));

        if (!fontSize) {
            fontSize = this.settings.fontSizes.find(function (fontSize) {
                return fontSize.value == this.defaultConfig.fontSize;
            }.bind(this));
        }

        return fontSize;
    }

    function setUserFontSize(size) {
        this.config.fontSize = size;

        $rootScope.$broadcast(constants.EVENT.FONTSIZE_UPDATED);
    }

    function getUserTheme() {
        var theme = this.settings.themes.find(function (theme) {
            return theme.name == this.config.theme;
        }.bind(this));

        if (!theme) {
            theme = this.settings.themes.find(function (theme) {
                return theme.name == this.defaultConfig.theme;
            }.bind(this));
        }

        return theme;
    }

    function setUserTheme(theme) {
        this.config.theme = theme;

        $rootScope.$broadcast(constants.EVENT.THEME_UPDATED);
    }

    function getPage() {
        return this.page;
    }

    function setPage(current_page) {
        this.page = current_page;
    }

    function getLocales() {
        return this.settings.locales;
    }

    function getFontSizes() {
        return this.settings.fontSizes;
    }

    function getThemes() {
        return this.settings.themes;
    }
}

settings.$inject = ['$rootScope', 'utility', 'database', 'constants'];
