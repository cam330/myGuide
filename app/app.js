(function() {
    'use strict';

   var app = angular.module('app', ['angularAudioRecorder', 'ui.router', 'firebase']);

   		app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

              $httpProvider.defaults.headers.common = {};
              $httpProvider.defaults.headers.post = {};
              $httpProvider.defaults.headers.put = {};
              $httpProvider.defaults.headers.patch = {};

   			$urlRouterProvider.otherwise("/homePageState");

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
          .state('homePageState',{
            url: "/homePageState",
            templateUrl: "app/partials/homePageState.html",
            controller: 'HomePageController',
            controllerAs: 'vm',
            data:{
              css: 'app/styles/styles.css'
            }
          })
          .state('loginPage',{
            url: "/loginPage",
            templateUrl: "app/partials/loginPage.html",
            controller: 'LoginController',
            controllerAs: 'vm',
            data:{
              css: 'app/styles/styles.css'
            }
          })

   		});
})();