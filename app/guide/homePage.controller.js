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
        vm.reviewsArray = [];
        var rootRef = firebase.database().ref();


        activate();

        ////////////////

        function activate() {

        vm.data = {
            series: ['Tour1', 'Tour2'],
            data: [{
              x: "12/6",
              y: [5, 0],
              tooltip: "this is tooltip"
            }, {
              x: "12/7",
              y: [7, 2]
            }, {
              x: "12/8",
              y: [2, 5]
            }, {
              x: "12/9",
              y: [10, 0]
            }, {
              x: "12/10",
              y: [2, 5]
            }, {
              x: "12/11",
              y: [3, 6]
            }, {
              x: "12/12",
              y: [7, 8]
            }, {
              x: "12/13",
              y: [3,7]
            }]
        };

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
                    // console.log(data);
                    // console.log("TURS"+data.tours);
                    vm.numberOfDownloads = data.Downloads;
                    vm.reviews = data.tours;
                    vm.name = data.name;
                    var tempArray = data.tours;
            for(var i = 0; i < tempArray.length; i++){
                console.log(tempArray[i]);
                rootRef.child('tours').child(tempArray[i]).once('value', function(snap){
                    // console.log(snap.val());
                    console.log(snap.val().title);
                    var x = snap.val();
                    vm.toursArray.push(x);
                });
                rootRef.child('reviews').child(tempArray[i]).once('value', function(snapshot){
                    var y = snapshot.val();
                    vm.reviewsArray.push(y);
                    $interval(function(){});
                    console.log(vm.reviewsArray);
                });

            }

            // console.log(vm.toursArray);
                    // var toursObj = $firebaseObject(rootRef.child('Mexico'));
                    // console.log(toursObj);
                })
			  } else {
			    // No user is signed in.
			    $state.go('loginPage');
			  }
			});
        }

        vm.config = {
            title: 'Downloads',
            tooltips: true,
            labels: false,
            mouseover: function() {},
            mouseout: function() {},
            click: function() {},
            legend: {
              display: true,
              //could be 'left, right'
              position: 'right'
            }
        };
    }
})();