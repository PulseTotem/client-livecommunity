'use strict';

/**
 * @ngdoc function
 * @name PulseTotemCommon.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the PulseTotemCommon
 */
angular.module('PulseTotemCommon')
  .controller('PulseTotemCommon.MenuCtrl', ['$rootScope', '$scope', '$translate', '$mdSidenav', function ($rootScope, $scope, $translate, $mdSidenav) {

    $scope.langList = [
      {
        "key" : "en",
        "title" : "LANG.ENGLISH",
        "flag" : "/images/flags/en.png"
      },
      {
        "key" : "fr",
        "title" : "LANG.FRENCH",
        "flag" : "/images/flags/fr.png"
      }
    ];

    $rootScope.langKey = $translate.use();

    $scope.changeLanguage = function (langKey) {
      $rootScope.langKey = langKey;
      $translate.use(langKey);
    };

    $scope.toggleLeft = buildToggler('left');
    /**
     * Build handler to open/close a SideNav;
     */
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle();
      }
    }

  }]);
