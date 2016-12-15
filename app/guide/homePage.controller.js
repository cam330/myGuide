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
        vm.myToursArray = [];
        vm.reviewersArray = [];
        var rootRef = firebase.database().ref();


        activate();

        ////////////////

        function activate() {

          var d = new Date();
          console.log(d.getMonth()+1 + ":" + d.getDate());

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
			    var userRef = $firebaseObject(rootRef.child('users').child(userId));

          userRef.$loaded().then(function(userData){
            console.log(userData);
            vm.name = userData.name;
            vm.numberOfDownloads = userData.Downloads;
          });

       //          //$interval refreshes page when teh tours and reviews are loaded
       //          $interval(function(){});
       //          var object = $firebaseObject(userRef);
       //          object.$loaded().then(function(data){
       //              // console.log(data);
       //              // console.log("TURS"+data.tours);
       //              vm.numberOfDownloads = data.Downloads;
       //              vm.reviews = data.tours;
       //              vm.name = data.name;
       //              var tempArray = data.tours;
       //              console.log(tempArray.length);

       //      for(var i = 0; i < tempArray.length; i++){
       //          console.log(tempArray[i]);
       //          rootRef.child('tours').child(tempArray[i]).once('value', function(snap){
       //              // console.log(snap.val());
       //              console.log(snap.val().title);
       //              var x = snap.val();
       //              vm.toursArray.push(x);
       //          });
       //          rootRef.child('reviews').child(tempArray[i]).once('value', function(snapshot){
       //              var y = snapshot.val();
       //              vm.reviewsArray.push(y);
       //              // $interval(function(){});
       //              console.log(vm.reviewsArray);
       //          });

       //      }

       // return firebase.database().ref('/users/' + userId + '/tours').once('value').then(function(snapshot){
       //  console.log(snapshot.val());
       //  vm.array = snapshot.val();
       //  console.log(vm.array.object);
       // });

       rootRef.child('users').child(userId).once('value', function(snapshot) {

          // snapshot.forEach(function(childSnapshot) {
            // var childKey = childSnapshot.key();
            // var childData = childSnapshot.val();
            // console.log(snapshot.val().tours);
            var tourRef = $firebaseArray(rootRef.child('users').child(userId).child('tours'));
            // console.log(tourRef);
            // for(var i = 0; i < snapshot.val().tours.length; i++){
            //   console.log("JEY");
            // }

            tourRef.$loaded().then(function(data){
                for(var i = 0; i < data.length; i++){
                        vm.toursArray.push(data[i].$id);
                        console.log(data);
                var myTours = $firebaseObject(rootRef.child('tours').child(vm.toursArray[i]));
                    myTours.$loaded().then(function(tourDetails){
                      // console.log(tourDetails);
                      vm.myToursArray.push(tourDetails);
                    })
                    // console.log(vm.myToursArray);
                var myReviews = $firebaseArray(rootRef.child('reviews').child(vm.toursArray[i]));
                    myReviews.$loaded().then(function(revDetails){
                        // console.log(revDetails);
                        vm.reviewsArray.push(revDetails);
                        // console.log(vm.reviewsArray);

                        for(var i = 0; i < revDetails.length; i++){
                          // console.log(revDetails[i].user);
                          var revUserId = revDetails[i].user;
                          // console.log(revUserId);
                          var reviewers = $firebaseArray(rootRef.child('users').child(revUserId));
                          reviewers.$loaded().then(function(peopleDetails){
                            vm.reviewersArray.push(peopleDetails[4].$value);
                            // console.log(peopleDetails[4].$value);
                          })
                          
                        }
                        // var reviewers = $firebaseArray(rootRef.child())

                        // var reviewers = $firebaseObject(rootRef.child('users').child(vm.reviewsArray[i].user));
                        //   reviewers.$loaded().then(function(peopleDetails){
                        //     console.log(peopleDetails);
                        //   });
                    });
                    console.log(vm.reviewsArray);

                }

            })

            // ...
          // });
        });

            // console.log(vm.toursArray);
                    // var toursObj = $firebaseObject(rootRef.child('Mexico'));
                    // console.log(toursObj);
                // })
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