(function() {
    'use strict';

    angular
        .module('app')
        .controller('StoreController', StoreController);

    StoreController.$inject = ['$http', '$firebaseObject', '$firebaseArray'];

    /* @ngInject */
    function StoreController($http, $firebaseObject, $firebaseArray) {
        var vm = this;
        vm.title = 'StoreController';

        var rootRef = firebase.database().ref();

        vm.toursArray = [];

        activate();

        ////////////////

        function activate() {
            var toursRef = rootRef.child('tours');
            var object = $firebaseArray(toursRef);

            object.$loaded().then(function(data){
                for(var i = 0; i < data.length; i++){
                        vm.toursArray.push(data[i]);
                }
                console.log(vm.toursArray);
            })
        }
    }
})();