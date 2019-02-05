
function httpGetAsync()
{
    $.ajax({
    url: "https://data.sfgov.org/resource/bbb8-hzi6.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "s4Ajzfw3YfIJ2by09eoY67yg0"
    }
	}).done(function(data) {
	  alert("Retrieved " + data.length + " records from the dataset!");
	  console.log(data);
	});
}



function mapping(loc) {
	
	return new Promise(function(resolve,reject) 
	{	
		var geocoder =  new google.maps.Geocoder();
		geocoder.geocode( { 'address': loc + ', us'}, function(results, status) 
		{
          if (status == google.maps.GeocoderStatus.OK) {
			  console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
            var x = results[0].geometry.location.lat(); 
			var y = results[0].geometry.location.lng(); 
			resolve([x,y]);
          } else {
            alert("Something got wrong " + status);
			  resolve('fail');
          }
        });
	});

}

var map;
async function initialize(loc) {
	z = await mapping(loc);
	//console.log(populate());
	body = await httpGetAsync();
	console.log(body);
	
	var prop = {
		center:new google.maps.LatLng(z[0],z[1]),
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
				  content:loc
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

function loadMap(){
	document.getElementById("map").style.display = 'block';
	var loc = $("#location").val();
    $("#location").attr("value", loc);
	map = initialize(loc);
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