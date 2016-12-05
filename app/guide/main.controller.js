(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$location', 'localStorageService', '$state'];

    /* @ngInject */
    function MainController($http, $location, localStorageService, $state ) {
        var vm = this;
        vm.title = 'MainController';

        activate();

        ////////////////

        function activate() {

        	vm.status = localStorageService.get("Loggedin");
        	console.log(vm.status);



        	vm.isActive = function(viewLocation) {
    			return viewLocation === $location.path();
			};
        }

        vm.logout = function(){

        	firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			  localStorageService.set("Loggedin", false);
			  window.location.reload();
			  $state.go('loginPage');
			}, function(error) {
			  // An error happened.
			});
        }
    }
})();