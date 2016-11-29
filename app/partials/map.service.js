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
        	console.log(passedBlob);
        }
    }
})();