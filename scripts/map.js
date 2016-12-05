angular.module('myApp', [])

.controller('myCtrl', function($scope) {

	  var loc;
	  var socket = io('http://localhost:3001');
     socket.on('message', function (data) {
		console.log('index:',data);
		loc=data;
		$scope.track();
		});
	
	var map = L.map('map').fitWorld();
	var mark;
	var circle;
	var firstpolyline;
	var d = fetchLocation();
	

	L.tileLayer('http://mt1.google.com/vt/lyrs{t}&x={x}&y={y}&z={z}', {
		maxZoom: 30,
		t:'m'
	}).addTo(map);
	
			var imageUrl = '../images/map2.jpg',
				imageBounds = L.latLngBounds([
        [13.04758, 77.61914],
        [13.04707, 77.61949]]);
		
			var topleft    = L.latLng(13.047548, 77.618953),
				topright   = L.latLng(13.047419, 77.619486),
				bottomleft = L.latLng(13.047110, 77.618858);

			map.fitBounds(imageBounds);

			var overlay = L.imageOverlay.rotated(imageUrl, topleft, topright, bottomleft, {
			opacity: 0.5,
			interactive: true,
		})
							.addTo(map);
							
		var innovation=L.marker([13.047548, 77.618953]).addTo(map)
			.bindPopup("Innovation team stall").openPopup();
			
		var abc=L.marker([13.047110, 77.618858]).addTo(map)
			.bindPopup("abc stall").openPopup();

	
	$scope.track = function(){
		if( mark != undefined ){
		map.removeLayer(mark);
		};
		console.log('map',loc);
		
		 mark=L.marker(loc).addTo(map)
			.bindPopup("You are here").openPopup();

		
		if( firstpolyline != undefined)
		{
			map.removeLayer(firstpolyline);
			$scope.move();
		}
	}

	
	$scope.move = function(){
		
		var c="";
		var e = document.getElementById("dest");
		var dest = e.options[e.selectedIndex].value;

		
		c=JSON.parse(d)[''+dest+''];
		

		
				if( firstpolyline != undefined)
		{
			map.removeLayer(firstpolyline);

		}
		
				if(c == undefined)
		{
			return;
		}
		
		if(dest != 'Select Destination\Clear'){
		
		if( firstpolyline != undefined)
		{
			map.removeLayer(firstpolyline);

		}
		console.log('inside direction');
		var coord=c.split(",");
		var pointA = loc;
		var pointB = new L.LatLng(coord[0],coord[1]);
		var pointList = [pointA, pointB];

		firstpolyline = new L.Polyline(pointList, {
		color: 'blue',
		weight: 3,
		opacity: 0.5,
		smoothFactor: 1

		});
		firstpolyline.addTo(map);
		innovation.openPopup();
		}
	};
});

	