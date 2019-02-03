
var map;
function initialize() {
	
	
	
	x = 38.674014;
	y = -121.139847;
	
	var prop = {
		center:new google.maps.LatLng(x,y),
		zoom:12,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), prop);
	
	//Listen for click on map
		google.maps.event.addListener(map, 'click', 
			function(event) {
				//add marker
				addMarker({coords:event.latLng});
			
		});
	
		
		// Array of markers
		var markers = [
			{
				coords:{lat:38.674014, lng:-121.139847}
			},
			{
				  coords:{lat:38.684014, lng:-121.130847},
				  content:'<h1>YOUR MOM</h1>'
			},
			{
				coords:{lat:38.689014, lng:-121.134847}
			}
		];

		for(var i = 0; i < markers.length; i++) {
			addMarker(markers[i]);
		}

			function addMarker(props){
				var marker = new google.maps.Marker({
				position:props.coords,
				map:map,
				});

				//Check for customIcon
				if(props.iconImage) {
					//set icon image
					marker.setIcon(props.iconImage);
				}

				//Check content
				if(props.content) {
					var infoWindow = new google.maps.InfoWindow({
						content:props.content
					});

				marker.addListener('click', function(){
					infoWindow.open(map, marker);
				});
				}

			}
	return map;
}

setTimeout(function(){
	map = initialize();

	},500);

function w3Load(){
	document.getElementById("map").style.display = 'block';
	google.maps.event.trigger(map, 'resize');
}
/*
// Initialize and add the map
function initMap(markers) {
		
	  // The location of Uluru
	  var options= {
		  zoom: 12,
		  center: {lat:38.674014, lng:-121.139847}
	  }
	  // The map, centered at Uluru
	  var map = new google.maps.Map(document.getElementById('map'), options);
	  
		//Listen for click on map
		google.maps.event.addListener(map, 'click', 
			function(event) {
				//add marker
				addMarker({coords:event.latLng});
			
		});
	
		
		// Array of markers
		var markers = [
			{
				coords:{lat:38.674014, lng:-121.139847}
			},
			{
				  coords:{lat:38.684014, lng:-121.130847},
				  content:'<h1>YOUR MOM</h1>'
			},
			{
				coords:{lat:38.689014, lng:-121.134847}
			}
		];

		for(var i = 0; i < markers.length; i++) {
			addMarker(markers[i]);
		}

			function addMarker(props){
				var marker = new google.maps.Marker({
				position:props.coords,
				map:map,
				});

				//Check for customIcon
				if(props.iconImage) {
					//set icon image
					marker.setIcon(props.iconImage);
				}

				//Check content
				if(props.content) {
					var infoWindow = new google.maps.InfoWindow({
						content:props.content
					});

				marker.addListener('click', function(){
					infoWindow.open(map, marker);
				});
				}

			}
		
}*/