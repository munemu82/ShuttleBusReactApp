import React from 'react';
import Geocode from "react-geocode";

let returnDistanceData=[];

//calculate distance between two places using latitude and longtitude
export const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2)  => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  };
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  };

// set Google Maps Geocoding API for purposes of quota management. Its optional
Geocode.setApiKey("AIzaSyANoYRAHybdGTkV91xzKgw3xWWkH_tzPYk");

export const getLatLonFromAddress = (address) => {
  // Get latidude & longitude from address.
  const finalResult = [];
  Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      finalResult[0] = lat; 
      finalResult[1] = lng;
    },
    error => {
      console.error(error);
    }
  );
  return finalResult;
}

//Calculate the distance
function calculateDistance(origin, destination) {
	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix({
		origins: [origin],
		destinations: [destination],
		travelMode: google.maps.TravelMode.DRIVING,
		//unitSystem: google.maps.UnitSystem.IMPERIAL,  //In miles and feet.
		unitSystem: google.maps.UnitSystem.metric, 
		avoidHighways: false,
		avoidTolls: false
  },callback);
  return returnDistanceData;
}
//get distance results
function callback(response, status){
	//if(status == google.mpas.DistanceMatrixStatus.OK){
  if (status == 'OK') {  //Check if google request was a success
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if(response.rows[0].elements[0].status === "ZERO_RESULTS"){
        return returnDistanceData;
	   }else{
        var distance = response.rows[0].elements[0].distance;
        var duration = response.rows[0].elements[0].duration;
        returnDistanceData[0] = distance.value /1000;
        returnDistanceData[1] = duration.value;
        returnDistanceData[2] = duration.text;
       }
	}
}
//print results

export default calculateDistance;
