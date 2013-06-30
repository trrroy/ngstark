var app = angular.module('ngStark', ['LocalStorageModule','ui.bootstrap']);
//Configure routes and controllers and views associated with them.
app.config(function ($routeProvider, $locationProvider) {
  //route setups
  /*$routeProvider.when('/admin/mobile/camp/:campId', {
    templateUrl: '//' + document.location.host + '/admin/mobile/ng-players.html',
    controller: 'PlayersCntl'
  });
  $routeProvider.when('/admin/mobile/camp/:campId/stats/:statsId/kid/:kidId',  {
    templateUrl: '//' + document.location.host + '/admin/mobile/ng-stats.html',
    controller: 'StatsCntl'
  });*/
  $routeProvider.otherwise({
    templateUrl: '//' + document.location.host + '/sites/all/themes/ngstark/templates/home.html',
    controller: 'homeCntl'
  });
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});
//
app.controller('appCtrl', function ($rootScope, $scope, $route, $routeParams, $location, localStorageService) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.localStorageService = localStorageService;
  //localStorageService.add('Favorite Sport','teeball');
  //$rootScope.nodes = [];
  $rootScope.nodes = [];
});
//
app.controller('homeCntl', function ($scope, $rootScope, $routeParams, $location, $http) {
  $scope.node = [];
  if ($scope.nid) {
    url = "/contentasjson/node/" + $scope.nid;
    $http.get(url).then(function(response) {
      $scope.node = response.data;
      //alert($scope.node.nid);
      $rootScope.nodes.push($scope.node);
    });
  } else {
    alert('no data loaded');
  }

});
