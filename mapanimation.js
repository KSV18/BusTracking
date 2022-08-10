

mapboxgl.accessToken ='pk.eyJ1Ijoic3ZtcGJ4IiwiYSI6ImNsNXg4aDV4YjByZ3Uzb3BkcnRyempwZWwifQ.90V8tvc-6Ud8fb-QJAb1Pw';

var markers = [];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 13,
});

async function run(){
	//gets bus data
 	const locations = await getBusLocations();
	locations.forEach(function (bus){
		var marker = getMarker(bus.id);		
		if (marker){
			moveMarker(bus);
		}
		else{
			addMarker(bus);			
		}
		
	});	
 	console.log(new Date());
 	console.log(locations);


 	setTimeout(run, 15000);
};

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
};

function addMarker(bus){
	var icon = getColor(bus);
	new mapboxgl.Marker(icon)
	.setLngLat([bus.attributes.longitude, bus.attributes.latitude])
	.addTo(map);
};

//markers color based on direction used default markers
function getColor(bus){
	var marker1 = {color:'red'};
	if(bus.attributes.direction_id === 0){
		return marker1;
	}
	return null;
};

function moveMarker(bus){
	var icon = getColor(bus);
	var marker = new mapboxgl.Marker(icon)
	.setLngLat([bus.attributes.longitude, bus.attributes.latitude])
	.addTo(map);

};


function getMarker(id){
	var marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
};





