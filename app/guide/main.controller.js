(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$location'];

    /* @ngInject */
    function MainController($http, $location) {
        var vm = this;
        vm.title = 'MainController';

        activate();

        ////////////////

        function activate() {

        	vm.isActive = function(viewLocation) {
    			return viewLocation === $location.path();
			};
        }
    }
})();