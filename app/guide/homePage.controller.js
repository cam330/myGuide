(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomePageController', HomePageController);

    HomePageController.$inject = ['$http', '$state', '$firebaseObject', '$firebaseArray', 'localStorageService', '$interval'];

    /* @ngInject */
    function HomePageController($http, $state, $firebaseObject, $firebaseArray, localStorageService, $interval) {
        var vm = this;
        vm.title = 'Controller';
        vm.toursArray = [];
        var rootRef = firebase.database().ref();

        activate();

        ////////////////

        function activate() {

        	localStorageService.set("Loggedin", true);

        	vm.status = localStorageService.get("Loggedin");
        	console.log(vm.status);

            // var userInfo = rootRef.child('users').child('btChJXUrUhbbJYpJuEPoZ17lfv73');
            // vm.fireObj = $firebaseArray(userInfo);

        	firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    // User is signed in.
			    var userId = user.uid;
			    var userRef = rootRef.child('users').child(userId);

                //$interval refreshes page when teh tours and reviews are loaded
                $interval(function(){});
                var object = $firebaseObject(userRef);
                object.$loaded().then(function(data){
                    console.log(data);
                    console.log(data.tours);
                    vm.numberOfDownloads = data.Downloads;
                    vm.name = data.name;
                    var tempArray = data.tours;
            for(var i = 0; i < tempArray.length; i++){
                rootRef.child('tours').child(tempArray[i]).once('value', function(snap){
                    console.log(snap.val());
                    var x = snap.val();
                    vm.toursArray.push(x);
                    console.log(vm.toursArray);

                });
                
            }
            console.log(vm.toursArray);
                    // var toursObj = $firebaseObject(rootRef.child('Mexico'));
                    // console.log(toursObj);
                })
			  } else {
			    // No user is signed in.
			    $state.go('loginPage');
			  }
			});
        }
    }
})();