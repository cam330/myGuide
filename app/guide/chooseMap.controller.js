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
        attraction:["Palacio Real", "Aqueduct of Segovia", "Sagrada Familia", "El Escorial", "Mezquita of Cordoba", "Alhambra"]}, 
        {country: "Mexico",
        attraction:["Guanajuato", "Palenque", "Tulum", "Chichen Itza", "Teotihuacan"]},
        {country:"China",
        attraction: ["Mogao Caves", "Leshan Giant Buddha", "Terracotta Army", "Forbidden City", "Potala Palace", "Great Wall"]},
        {country :"France",
        attraction : ["Sainte Chapelle", "Centre Pompidou", "Mesee d'Orsay", "Jardin du Luxembourg", "Notre Dame", "Sacre-Coeur", "Arc de Triomphe", "Louvre", "Eiffel Tower"]},
        {country:"Germany",
        attraction: ["Frauenkirche", "Lindau", "Cologne Cathedral", "Holstentor", "Heidelberg Old City", "Brandenburg Gate", "Neuschwanstein"]},
        {country:"Italy",
        attraction: ["San Gimignano", "Cinque Terre", "Leaning Tower of Pisa", "Pompeii", "Piazza del Campo", "Santa Maria del Fiore", "Vatican City", "Colosseum", "St Mark's Basilica"]},
        {country:"Russia",
        attraction: ["St Sophia Cathedral, Novgorod", "Suzdal", "Moscow Kremlin", "Hermitage Museum", "Saint Basil's Cathedral"]},
        {country:"Turkey",
        attraction: ["Aspendos Theatre", "Bodrum Castle", "Mount Nemrut", "Blue Mosque", "Library of Celsus", "Hagia Sophia"]},
        {country:"United Kingdom",
        attraction: ["Warwick Castle", "Tower of London", "Durham Cathedral", "York Minster", "Windsor Castle", "Big Ben", "Stonehenge"]},
        {country:"United States",
        attraction: ["White House", "Denali National Park", "Las Vegas Strip", "Kilauea", "Niagara Falls", "Golden Gate Bridge", "Yellowstone", "Manhattan", "Grand Canyon"]}];

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