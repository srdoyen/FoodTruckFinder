
function httpGetAsync(coordinates)
{
	
	return new Promise(function(resolve,reject) 
	{	
		myUrl = "https://data.sfgov.org/resource/bbb8-hzi6.json?$where=within_circle(location_2, " + coordinates[0] + ", " + coordinates[1] + ", 1000)";
		console.log(myUrl);
		$.ajax({
		url: myUrl,
		type: "GET",
		data: {
		  "$limit" : 10,
		  "$$app_token" : "s4Ajzfw3YfIJ2by09eoY67yg0",
		}
		}).done(function(data) {
		  //alert("Retrieved " + data.length + " records from the dataset!");
			resolve(data);
		  //console.log(data);
		});
	});
	
	
}

var map;
async function initialize(loc) {
	coordinates = await mapping(loc);
	foodTrucks = await httpGetAsync(coordinates);
	console.log(foodTrucks);
	
	var prop = {
		center:new google.maps.LatLng(coordinates[0],coordinates[1]),
		zoom:15,
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
		var markers = new Array(foodTrucks.length);
	
		for (var i = 0; i < markers.length; i++)
		{
			markers[i] = 
			{
				coords:{lat:parseFloat(foodTrucks[i].latitude), lng: parseFloat(foodTrucks[i].longitude)},
				content: foodTrucks[i].applicant
			}
		}
			
		
	
		for(var i = 0; i < markers.length; i++) {
			//coor = {foodTrucks[i].latitude, foodTrucks[i].longitude}
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


function mapping(loc) {
	
	return new Promise(function(resolve,reject) 
	{	
		var geocoder =  new google.maps.Geocoder();
		geocoder.geocode( { 'address': loc + ', San Francisco, us'}, function(results, status) 
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


function loadMap(){
	document.getElementById("map").style.display = 'block';
	var loc = $("#location").val();
    $("#location").attr("value", loc);
	map = initialize(loc);
}
