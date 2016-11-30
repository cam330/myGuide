(function() {
    'use strict';

   var app = angular.module('app', ['angularAudioRecorder', 'ui.router']);

   		app.config(function($stateProvider, $urlRouterProvider){

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