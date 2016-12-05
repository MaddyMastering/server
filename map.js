angular.module('myApp', [])

.controller('myCtrl', function($scope) {

	
	var map = L.map('map').fitWorld();
	var mark;
	var circle;
	var firstpolyline;
	var loc;

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

	function onLocationFound(e) {
	
		if( mark != undefined ){
		map.removeLayer(mark);
		map.removeLayer(circle);
		};
		var radius = e.accuracy / 2;
		
		 mark=L.marker(e.latlng).addTo(map)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();

		 circle=L.circle(e.latlng, radius).addTo(map);
		
		console.log(e.latlng);
		console.log(e.accuracy);
		loc = e.latlng;
		
		if( firstpolyline != undefined)
		{
			map.removeLayer(firstpolyline);
			$scope.move();
		}
	}

	function onLocationError(e) {
		alert(e.message);
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

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);
	map.addControl(new customControl());
	map.locate({setView: true, maxZoom: 20, watch: true, enableHighAccuracy: true});
});

	