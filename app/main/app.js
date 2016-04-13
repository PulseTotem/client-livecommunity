'use strict';

/**
 * @ngdoc overview
 * @name pulsetotemLiveCommunityClientApp
 * @description
 * # pulsetotemLiveCommunityClientApp
 *
 * Main module of the application.
 */
angular
    .module('pulsetotemLiveCommunityClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'pascalprecht.translate',
    'btford.socket-io',
    'ngFileUpload',
    'angular-loading-bar',
    'PulseTotemCommon',
    'PulseTotemVideo'
    ])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('orange')
        .accentPalette('deep-purple');
      $mdThemingProvider.theme('altTheme')
        .primaryPalette('deep-purple')
        .accentPalette('orange');
    }]);
