(function() {
    'use strict';

    angular
        .module('app')
        .controller('ChooseMapController', ChooseMapController);

    ChooseMapController.$inject = ['$http', '$state', 'localStorageService'];

    /* @ngInject */
    function ChooseMapController($http, $state, localStorageService) {
        var vm = this;
        vm.title = 'ChooseMapController';
        vm.chosenTour = 'Choose a Map';

        vm.countriesArray = ["Spain", "France", "Germany", "United States", "Russia", "China"];
        vm.franceArray = ["Eiffel Tower", "Notre Dame", "Arc de Triomphe", "French Riviera", "The Louvre"];

        vm.placesArray = [
        {country: "Spain", 
        attraction:["Sagrada Familia", "El Escorial", "Alhambra"]}, 
        {country: "Japan",
        attraction:["Horyu-ji"]},
        {country :"France",
        attraction : ["Notre Dame", "Arc de Triomphe", "Eiffel Tower"]},
        {country:"Germany",
        attraction: ["Reichstag Building","Neuschwanstein"]},
        {country:"Italy",
        attraction: ["Colosseum", "Pantheon", "Florence Cathedral"]},
        {country:"United Kingdom",
        attraction: ["Tower of London", "Buckingham Palace", "Stonehenge"]},
        {country:"United States",
        attraction: ["White House", "Statue of Liberty"]}];

        activate();

        ////////////////

        function activate() {

        }

        vm.clickedCountry = function(countryIndex, country){

            vm.country = country;
        	vm.attractionsArray = vm.placesArray[countryIndex].attraction;
            vm.chosenTour = country;

        }

        vm.clickedAttraction = function(place){
        	console.log(place);
            localStorageService.set('attraction', place);
            localStorageService.set('country', vm.country);
        	$state.go('createMapState');

        }
    }
})();