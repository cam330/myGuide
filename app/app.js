(function() {
    'use strict';

   var app = angular.module('app', ['angularAudioRecorder', 'ui.router', 'firebase', 'LocalStorageModule', 'chart.js', 'angularCharts']);

   		app.config(function($stateProvider, $urlRouterProvider, $httpProvider){

              $httpProvider.defaults.headers.common = {};
              $httpProvider.defaults.headers.post = {};
              $httpProvider.defaults.headers.put = {};
              $httpProvider.defaults.headers.patch = {};
              

   			$urlRouterProvider.otherwise("/settingsState");

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
          .state('registerState',{
            url: "/registerState",
            templateUrl: "app/partials/registerState.html",
            controller: 'RegisterController',
            controllerAs: 'vm',
            data:{
              css: 'app/styles/styles.css'
            }
          })
          .state('chooseMapState',{
            url: "/chooseMapState",
            templateUrl: "app/partials/chooseMapState.html",
            controller: 'ChooseMapController',
            controllerAs: 'vm',
            data:{
              css: 'app/styles/styles.css'
            }
          })
          .state('storePage',{
            url: "/storePage",
            templateUrl: "app/partials/storePage.html",
            controller: 'StoreController',
            controllerAs: 'vm',
            data:{
              css: 'app/styles/styles.css'
            }
          })
          .state('settingsState',{
            url: "/settingsState",
            templateUrl: "app/partials/settingsState.html",
            controller: 'SettingsController',
            controllerAs: 'vm',
            data:{
              css: 'app/styles/styles.css'
            }
          })
   		});
})();