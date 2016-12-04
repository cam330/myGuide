(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$location', 'localStorageService'];

    /* @ngInject */
    function MainController($http, $location, localStorageService) {
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
			}, function(error) {
			  // An error happened.
			});
        }
    }
})();