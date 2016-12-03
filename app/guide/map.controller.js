(function() {
    'use strict';


      var config = {
        apiKey: "AIzaSyA0QCMjwKqyLST5MWCdWaAnj-XsUSrDb_c",
        authDomain: "myguide-db6d3.firebaseapp.com",
        databaseURL: "https://myguide-db6d3.firebaseio.com",
        storageBucket: "myguide-db6d3.appspot.com",
        messagingSenderId: "1011425834238"
      };
      firebase.initializeApp(config);

    angular
        .module('app')
        .controller('MapController', MapController);

    MapController.$inject = ['$http', 'MapService', '$firebaseObject', '$firebaseArray'];

    /* @ngInject */
    function MapController($http, MapService, $firebaseObject, $firebaseArray, users) {
        var vm = this;

        var rootRef = firebase.database().ref();
        // // var rootRef = new Firebase("https://myguide-db6d3.firebaseio.com");
        // var davidRef = rootRef.child('users').child('cam');
        // this.user = $firebaseObject(davidRef);
        // console.log(this.user);

        vm.title = 'MapController';
        vm.pointsArray = [];
        vm.detailsArray = [];

        //Used for moving the point
        window.onload = addListeners;

        //Disables the dragging of image.
        //Used for moving points but not dragging image
        document.getElementById('img').ondragstart = function() { return false; };

        activate();

        ////////////////

        function activate() {

        	vm.enablePointAdd = false;
            vm.showAddDetailView = false;

        	console.log(vm.enablePointAdd);
        	
        }

        vm.addPoint = function(){
        	vm.enablePointAdd =true;
        }

        //Imables points of intrest to be moved around
        function addListeners(){
        	document.getElementById('dxy').addEventListener('mousedown', mouseDown, false);
        	window.addEventListener('mouseup', mouseUp, false);
        }

        //What happens when point of intrest is moved and click drag has ended
        function mouseUp() {
        	window.removeEventListener('mousemove', divMove, true);
        }

        //Tells point of intrest to prepare to move on drag
        function mouseDown(e) {
        	window.addEventListener('mousemove', divMove, true);
        }

        //sets the new location for the point of inerest
        function divMove(e) {
        	var div = document.getElementById('dxy');
        	div.style.position = 'absolute';
        	div.style.top = e.clientY + 'px';
        	div.style.left = e.clientX + 'px';

        }


        //When map is clicked, gets the percentage of image that has been selected
        vm.addOnClick = function($event){

        	if (vm.enablePointAdd == true) {
            vm.showAddDetailView = true;
        	var element = document.getElementById("img");

        	console.log(vm.pointsArray.length+1);

        	vm.detailButtonid = vm.pointsArray.length+1;
        	console.log(vm.detailButtonid);

        	vm.percentW = (($event.offsetX - 10)/ element.offsetWidth)*100;
        	vm.percentH = (($event.offsetY - 10)/ element.offsetHeight)*100;

        	vm.pointsArray.push("<button style='top:" + vm.percentH + "% right:" + vm.percentW + "% class='addText2' ng-click='vm.detailBtn('hello')' ng-model='vm.btn'>2</button>");

        	var newButton = document.createElement( "button" ),
        	elStyle = {
        		position: "absolute",
        		top: vm.percentH + "%",
        		left: vm.percentW + "%",
        		"background-color" : "red",
        		"border-radius" : 3 + "px",
        	};

        	Object.keys( elStyle ).forEach(function ( property ) {
        		newButton.style[ property ] = elStyle[ property ];
        		newButton.id = "point" + vm.pointsArray.length;
        		newButton.value = vm.pointsArray.length;
        		newButton.onclick = function(){
        			// console.log(vm.detailsArray[newButton.value-1].title + vm.detailsArray[newButton.value-1].detail);
        			// vm.pointSelected = vm.detailsArray[newButton.value-1].title;
        			// console.log(vm.pointSelected);
        			// vm.detail = vm.pointsArray[newButton.value];
        			console.log(vm.detailsArray[newButton.value-1]);
        			vm.testTitle = vm.detailsArray[newButton.value-1];
        		};
        	});

        	newButton.innerHTML = vm.pointsArray.length;
        	document.getElementById("imageDiv").appendChild( newButton );

        	// document.getElementById("point").onclick = function() {
        	// 	console.log("HEYY");
        	vm.enablePointAdd = false;
        	// }
        } else {
        	console.log("NEED TO CLICK ADD");
        }

        }

        //What happens when the point of interest has been tapped
        vm.detailBtn = function(Text){
        	console.log(vm.pointsArray);
        	console.log(Text);
        }

        vm.addDetail = function(title){
        	vm.pointTitle = "";
			vm.pointDetails = "";
            vm.dataString = MapService.returnBlob();
            vm.dataString = vm.dataString.substring(22);
        	vm.detailsArray.push({'title' : title, 'id' : vm.detailButtonid, 'detail' : vm.pointDetails, 'percentTop' : vm.percentH, 'percentLeft' : vm.percentW, 'audio' : vm.dataString});
        	console.log(vm.detailsArray);
            vm.showAddDetailView = false;

        }

        vm.cancelDetailAdd = function(){
            vm.pointTitle = "";
            vm.pointDetails = "";
            vm.showAddDetailView = false;
        }

        vm.apiTestButton = function(){
            //*** BELOW FOR USING MONGODB
            // var randomId = Math.random() * ()
            // MapService.postTour(vm.detailsArray).then(function(response){
            //     console.log(response);
            // });

            //*** BELOW FOR GETTING ARRAY OF ALL USERS IN USERS TABLE
            this.users = $firebaseArray(rootRef.child('HELLO'));

            //*** BELOW FOR GETTING A USER BY THE NAME OF CAM
            // this.user = MapService.get('cam');


            //*** BELOW LOGS BEFORE ALL DATA IS RETURNED
            // console.log(this.users);
            // console.log(this.users.length);

            //*** BELOW WAITS FOR ALL DATA TO LOAD THEN CONSOLE LOGS IT
            this.users.$loaded().then(function() {
                console.log(this.users.length);
                console.log(this.users);
            }.bind(this));

            //*** BELOW FUNCTION NOT BEING USED
            // MapService.fireBaseTest().then(function(response){
            //     console.log(response);
            // });
        }

        vm.apiPostButton = function(){
            rootRef.child('tours').child('france').set({array: vm.detailsArray});
        }
    }
})();