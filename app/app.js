(function() {
    'use strict';

   var app = angular.module('app', ['angularAudioRecorder', 'ui.router', 'firebase']);

   		app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

              $httpProvider.defaults.headers.common = {};
              $httpProvider.defaults.headers.post = {};
              $httpProvider.defaults.headers.put = {};
              $httpProvider.defaults.headers.patch = {};

   			$urlRouterProvider.otherwise("/createMapState");

   			$stateProvider
   				.state('createMapState',{
   					url: "/createMapState",
   					templateUrl: "app/partials/createMapState.html",
   					controller: 'MapController',
   					controllerAs: 'vm',
   					data:{
   						css: 'app/styles/styles.css'
   					}
   				})

   		});
})();