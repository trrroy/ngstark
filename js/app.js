'use strict';

var ngStark = angular.module('ngStark', ['ngStark.filters', 'ngStark.services', 'ngStark.directives', 'ngStark.controllers','LocalStorageModule','ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //route setups
    /*$routeProvider.when('/admin/mobile/camp/:campId', {
      templateUrl: '//' + document.location.host + '/admin/mobile/ng-players.html',
      controller: 'PlayersCntl'
    });*/
    $routeProvider.when('/contacts',  {
      templateUrl: '//' + document.location.host + '/sites/all/themes/ngstark/templates/contacts.html',
      controller: 'contactCntl'
    });
    $routeProvider.when('/tasks',  {
      templateUrl: '//' + document.location.host + '/sites/all/themes/ngstark/templates/tasks.html',
      controller: 'taskCntl'
    });
    $routeProvider.otherwise({
      templateUrl: '//' + document.location.host + '/sites/all/themes/ngstark/templates/home.html',
      controller: 'homeCntl'
    });
    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  }]);
