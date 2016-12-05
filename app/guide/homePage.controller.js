(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomePageController', HomePageController);

    HomePageController.$inject = ['$http', '$state', '$firebaseObject', 'localStorageService'];

    /* @ngInject */
    function HomePageController($http, $state, $firebaseObject, localStorageService) {
        var vm = this;
        vm.title = 'Controller';

        var rootRef = firebase.database().ref();

        activate();

        ////////////////

        function activate() {

        	localStorageService.set("Loggedin", true);

        	vm.status = localStorageService.get("Loggedin");
        	console.log(vm.status);

            console.log(firebase.database().ref('/users/' + 'btChJXUrUhbbJYpJuEPoZ17lfv73').once('value').then(function(snapshot) {
  var username = snapshot.val().username;
  // ...
}))

        	firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    // User is signed in.
			    var userId = user.uid;
			    var userRef = rootRef.child('users').child(userId);
			    console.log($firebaseObject(userRef));
                // vm.numberOfDownloads = userRef.Downloads;
                console.log($firebaseObject(userRef).child('email'));
			    console.log(vm.name);
			  } else {
			    // No user is signed in.
			    $state.go('loginPage');
			  }
			});
        }
    }
})();