(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$state','localStorageService', '$firebaseObject'];

    /* @ngInject */
    function LoginController($http, $state, localStorageService, $firebaseObject) {
        var vm = this;
        vm.title = 'LoginController';

        activate();

        ////////////////

        function activate() {
        	localStorageService.set("Loggedin", false);

        }

        vm.loginUser = function(email, password){

        	console.log(email, password);

			//Login user function
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  


			  // ...
			});

			firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    // User is signed in.
			    $state.go("homePageState");
			  } else {

			  }
			});


			// firebase.auth().signOut().then(function() {
			// 		console.log("LOGGEDOUT");
			// 	}, function(error) {
			// 	  console.log("ERRRR");
			// });
        }
    }
})();