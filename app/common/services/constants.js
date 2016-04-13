'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.PulseTotemCommon.constant:Constants
 * @description
 * Constants for the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemCommon')
    .constant('CONSTANTS', {
        backendUrl: 'http://localhost:4000/',
        //backendUrl: 'http://backend.pulsetotem.fr/',
        //backendUrl: 'http://backend-test.pulsetotem.fr/',
        loginBackendPath: 'login',
        loginFromTokenBackendPath: 'loginFromToken',
        homeRoute: '/',
        afterLoginRoute: '/dashboard',

        liveCommunityServiceUrl: 'http://localhost:6020/',
        //liveCommunityServiceUrl: 'https://service-livecommunity.pulsetotem.fr/',
        //liveCommunityServiceUrl: 'https://service-livecommunity-test.pulsetotem.fr/',
        liveCommunityUploadsPath: 'uploads'
    });
