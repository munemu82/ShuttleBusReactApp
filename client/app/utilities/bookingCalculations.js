//Compute booking fare
export const computeBookingFare = (distanceInKm, duration, baseFare, farePerMin, farePerKm) =>{
    //convert duration from seconds to minutes
    const durationInMins = duration / 60;
    //convert string values to float numbers
    const baseFareNum = parseFloat(baseFare);
    const farePerKmNum = parseFloat(farePerKm);
    const farePerMinNum = parseFloat(farePerMin);
    //calculate final booking fare
    const finalFare = baseFareNum + (farePerMinNum * durationInMins) + (farePerKmNum * distanceInKm);
    return finalFare;
}

export const roundNumber = (num, scale) => {
    if(!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  }

  export const formFiieldError = (fieldValue, isSubmit) =>{
    if(!isSubmit && fieldValue === ''){
      <div className="errorMessage">
      This is a required field!
      </div>
    }
  }