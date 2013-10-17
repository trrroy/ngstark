'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ngStark.services', [])
  .value('version', '0.1')
  .factory('taskService', function($resource) {
     //var baseUrl = 'http://designit-todo.eu01.aws.af.cm/api/todos/:id';
     var baseUrl = 'http://troy.doing-more.husointeractive.com:port/contentasjson/view/task_list-block_4';
     console.log('baseurl:' + baseUrl);
     return $resource(baseUrl,
       {port: ':80'}, {
         'get':    {method:'GET'},
         'save':   {method:'POST'},
         'query':  {method:'GET', isArray:true},
       });

  })
  .factory('peopleService', function($resource) {
     var baseUrl = 'http://troy.doing-more.husointeractive.com:port/contentasjson/contentasjson/view/contacts_list-block_1';i
     console.log('baseurl:' + baseUrl);
     return $resource(baseUrl,
       {port: ':80'}, {
         'get':    {method:'GET'},
         'save':   {method:'POST'},
         'query':  {method:'GET', isArray:true},
       });
  })
  .factory('socket', function($rootScope) {
    console.log('socket start');
     var socket = io.connect('http://troy.doing-more.husointeractive.com:8181/', { resource : 'socket.io/socket.io.js' });
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



