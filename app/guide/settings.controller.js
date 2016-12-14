(function() {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$http', '$interval'];

    /* @ngInject */
    function SettingsController($http, $interval) {
        var vm = this;
        vm.title = 'SettingsController';

        var fileButton = document.getElementById('fileButton')

        activate();

        ////////////////

        function activate() {
        	firebase.auth().onAuthStateChanged(function(user) {
        		if (user) {
        			vm.userId = user.uid;
        			return firebase.database().ref('/users/' + vm.userId).once('value').then(function(snapshot){
        				vm.name = snapshot.val().name;
        				vm.email = snapshot.val().email;
        				vm.location = snapshot.val().location;
        				console.log(vm.name, vm.email, vm.location);
        				$interval(function(){});
        			});
        		} else {
        			console.log("ERROR")
        		}
        	});
        }

        vm.changePhoto = function() {
        	console.log("Change!")
        }


        vm.uploadPhoto = function(file) {
        	// vm.file = vm.myFile;
        	console.log(file)
        }

        vm.updatePassword = function(oldPassword, newPassword, reNewPassword) {
        	if(newPassword == reNewPassword){
        		console.log("IT IS");
        		var ref = firebase.database().ref()

        		ref.changePassword({
        			email : vm.email,
        			oldPassword : oldPassword,
        			newPassword : newPassword
        		}, function(error) {
        				if (error === null) {
        					console.log("Password has been changed!")
        				} else {
        					console.log("Error while changing!")
        				}
        		});
        	} else {
        		console.log("News don't match");
        	}
        	
    	}
    }
})();