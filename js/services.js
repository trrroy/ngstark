'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ngStark.services', [])
  .value('version', '0.1')
  .factory('taskService', function($http) {
    var taskService = {
      async: function() {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('/contentasjson/view/task_list-block_4').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };
    return taskService;
  })
  .factory('peopleService', function($http) {
    var peopleService = {
      async: function() {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('/contentasjson/view/contacts_list-block_1').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };
    return peopleService;
  })
  .factory('socket', function($rootScope) {
    console.log('socket start');
     //var socket = io.connect();
     var socket = io.connect('http://troy.doing-more.husointeractive.com:8181/');
     return {
       on: function(eventName, callback) {
           console.log('socket on');
         socket.on(eventName, function() {
           var args = arguments;
           $rootScope.$apply(function() {
             callback.apply(socket, args);
           })
         });
       },
       emit: function(eventName, data, callback) {
           console.log('socket emit');
         socket.emit(eventName, data, function() {
           var args = arguments;
           $rootScope.$apply(function() {
             if (callback) {
               callback.apply(socket, args);
             }
           });
         });
       },
       send: function(eventName, data, callback) {
           console.log('socket send');
         socket.send(eventName, data, function() {
           var args = arguments;
           $rootScope.$apply(function() {
             if (callback) {
               callback.apply(socket, args);
             }
           });
         });
       }
     }
   });



