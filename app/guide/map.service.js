(function() {
    'use strict';

    angular
        .module('app')
        .service('MapService', MapService);

    MapService.$inject = ['$http','$firebaseObject', '$firebaseArray'];

    /* @ngInject */
    function MapService($http, $firebaseObject, firebaseArray) {
        // this.func = func;
        var passedBlob = '';

        var rootRef = firebase.database().ref();

        ////////////////

        // function func() {
        // }

        this.passedAudioBlob = function(blob){
        	passedBlob = blob;
        }

        this.returnBlob = function(){
        	return passedBlob;
        }

        this.getTour = function(){
            return $http({
                method: 'GET',
                url: 'https://api.mlab.com/api/1/databases/my_guide_tours/collections/tours',
                params: {
                    apiKey: '0rdvbEXev3ChCAmAIpPVl46Wg_INZ5Eq'
                }
            }).then(function(response){
                console.log(response);
            });
        }

        this.postTour = function(detailArray){
            return $http({
                method: 'POST',
                url:'https://api.mlab.com/api/1/databases/my_guide_tours/collections/tours?apiKey=0rdvbEXev3ChCAmAIpPVl46Wg_INZ5Eq',
                contentType: "application/json",
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                data: {
                    // title: 'test1',
                    // _id:1,
                    // detail: 'Details',
                    // percentTop: 30,
                    // percentLeft: 43,
                    // audio: 'SOMETHING LONG!'
                    array: detailArray
                }
            }).then(function(response){
                console.log(response);
            });
        }

        this.fireBaseTest = function(id){
            
   
        }

        //*** BELOW GETTING A USER BY A NAME THAT WAS PASSED IN BY ID FROM CONTROLLER, TEST IS SET UP FOR USER NAME CAM
        this.get = function get(id){
            var rootRef = firebase.database().ref();
            var userNameRef = rootRef.child('users').child(id);
            var userFromName = $firebaseObject(userNameRef);
            return userFromName;
        }

        //*** BELOW GETTING ALL OF THE USERS INSIDE THE USERS TABLE
        this.all = function all(){
            var rootRef = firebase.database().ref();
            var allUsers = $firebaseObject(rootRef);
            return allUsers;
        }
    }
})();









