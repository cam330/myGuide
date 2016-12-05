(function() {
    'use strict';

    angular
        .module('app')
        .controller('ChooseMapController', ChooseMapController);

    ChooseMapController.$inject = ['$http', '$state'];

    /* @ngInject */
    function ChooseMapController($http, $state) {
        var vm = this;
        vm.title = 'ChooseMapController';

        vm.countriesArray = ["Spain", "France", "Germany", "United States", "Russia", "China"];
        vm.franceArray = ["Eiffel Tower", "Notre Dame", "Arc de Triomphe", "French Riviera", "The Louvre"];

        activate();

        ////////////////

        function activate() {
        }

        vm.clickedCountry = function(countryIndex){
        	console.log(countryIndex);
        	vm.attractionsArray = vm.franceArray;
        }

        vm.clickedAttraction = function(attractionIndex){
        	console.log(vm.franceArray[attractionIndex]);
        	$state.go('createMapState');

        }
    }
})();