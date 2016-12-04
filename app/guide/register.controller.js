(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http'];

    /* @ngInject */
    function RegisterController($http) {
        var vm = this;
        vm.title = 'RegisterController';

        activate();

        ////////////////

        function activate() {
        }

        vm.register = function(email, name, password){

        	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;

			  console.log(errorCode);
			  console.log(errorMessage);

			  // ...
			});

        }
    }
})();