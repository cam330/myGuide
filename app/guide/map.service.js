(function() {
    'use strict';

    angular
        .module('app')
        .service('MapService', MapService);

    MapService.$inject = ['$http'];

    /* @ngInject */
    function MapService($http) {
        // this.func = func;
        var passedBlob = '';

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
    }
})();









