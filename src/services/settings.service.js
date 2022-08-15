angular
    .module('todo-app')
    .service('settings', settings);

function settings($rootScope, util, database, constants, i18n) {
    this.user = null;
    this.config = {};
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
    this.getLoggedInUser = getLoggedInUser;
    this.removeLoggedInUser = removeLoggedInUser;
    this.getUserLocale = getUserLocale;
    this.getDefaultLocale = getDefaultLocale;
    this.setUserLocale = setUserLocale;
    this.getUserFontSize = getUserFontSize;
    this.getDefaultFontSize = getDefaultFontSize;
    this.setUserFontSize = setUserFontSize;
    this.getUserTheme = getUserTheme;
    this.getDefaultTheme = getDefaultTheme;
    this.setUserTheme = setUserTheme;
    this.getLocales = getLocales;
    this.getFontSizes = getFontSizes;
    this.getThemes = getThemes;

    function initialize(userData) {
        if (database.isInitialized()) {
            if (userData) {
                var user = {
                    id: userData.id,
                    name: userData.name,
                    avatar: userData.avatar,
                    locale: userData.locale,
                    settings: JSON.parse(userData.settings)
                };

                this.user = user;
            }

            setupConfig.call(this);
        }
    }

    function setupConfig() {
        this.config = JSON.parse(JSON.stringify(this.defaultConfig));

        if (this.user) {
            this.user.settings = this.user.settings || {};
            this.user.locale !== this.config.locale && this.setUserLocale(this.user.locale);
            this.user.settings.fontSize !== this.config.fontSize && this.setUserFontSize(this.user.settings.fontSize);
            this.user.settings.theme !== this.config.theme && this.setUserTheme(this.user.settings.theme);
        }
    }

    function getLoggedInUser() {
        return this.user;
    }

    function removeLoggedInUser() {
        this.user = null;
    }

    function getUserLocale() {
        var locale = this.settings.locales.find(function (locale) {
            return locale.value == this.config.locale;
        }.bind(this));

        if (!locale) {
            locale = getDefaultLocale.call(this);
        }

        return locale;
    }

    function getDefaultLocale() {
        return this.settings.locales.find(function (locale) {
            return locale.value == this.defaultConfig.locale;
        }.bind(this))
    }

    function setUserLocale(locale) {
        if (this.config.locale !== locale) {
            this.config.locale = locale;
            i18n.setLocale(locale);
    
            $rootScope.$broadcast(constants.EVENT.LOCALE_UPDATED);
        }
    }

    function getUserFontSize() {
        var fontSize = this.settings.fontSizes.find(function (fontSize) {
            return fontSize.value == this.config.fontSize;
        }.bind(this));

        if (!fontSize) {
            fontSize = getDefaultFontSize.call(this);
        }

        return fontSize;
    }

    function getDefaultFontSize() {
        return this.settings.fontSizes.find(function (fontSize) {
            return fontSize.value == this.defaultConfig.fontSize;
        }.bind(this));
    }

    function setUserFontSize(size) {
        if (this.config.fontSize != size) {
            this.config.fontSize = size;

            $rootScope.$broadcast(constants.EVENT.FONT_SIZE_UPDATED);
        }
    }

    function getUserTheme() {
        var theme = this.settings.themes.find(function (theme) {
            return theme.name == this.config.theme;
        }.bind(this));

        if (!theme) {
            theme = getDefaultTheme.call(this);
        }

        return theme;
    }

    function getDefaultTheme() {
        return this.settings.themes.find(function (theme) {
            return theme.name == this.defaultConfig.theme;
        }.bind(this));
    }

    function setUserTheme(theme) {
        if (this.config.theme != theme) {
            this.config.theme = theme;

            $rootScope.$broadcast(constants.EVENT.THEME_UPDATED);
        }
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

settings.$inject = ['$rootScope', 'utility', 'database', 'constants', 'i18n'];
