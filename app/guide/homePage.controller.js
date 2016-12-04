(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomePageController', HomePageController);

    HomePageController.$inject = ['$http', '$state', 'localStorageService'];

    /* @ngInject */
    function HomePageController($http, $state, localStorageService) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
        	localStorageService.set("Loggedin", true);

        	vm.status = localStorageService.get("Loggedin");
        	console.log(vm.status);

        	firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    // User is signed in.
			    console.log(user);
			  } else {
			    // No user is signed in.
			    $state.go('loginPage');
			  }
			});
        }
    }
})();