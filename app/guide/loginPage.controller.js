(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http'];

    /* @ngInject */
    function LoginController($http) {
        var vm = this;
        vm.title = 'LoginController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();