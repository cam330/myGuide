(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http', '$state', '$firebaseObject', 'localStorageService'];

    /* @ngInject */
    function RegisterController($http, $state, $firebaseObject, localStorageService) {
        var vm = this;
        vm.title = 'RegisterController';

        var rootRef = firebase.database().ref();

        activate();

        ////////////////

        function activate() {

    	localStorageService.set("Loggedin", false);
        }

        vm.register = function(email, name, password){

        	if(!email || !name || !password || password != vm.rePassword){
				console.log('It not right');
        		console.log(email);
        } else {
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(userResponse) {

			var uid = firebase.auth().currentUser.uid;
			rootRef.child('users').child(uid).set({name: name, email: email, userId: uid});

	  		$state.go("loginPage");

		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;

		  console.log(errorCode);
		  console.log(errorMessage);

		  // ...
		});

        }

        }
    }
})();