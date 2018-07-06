const driverDetails = getDriverByEmail(authenticatedUserEmail).then( () =>{
    if(driverDetails.length > 0){
      isDriver = true;
      console.log(driverDetails);
    }
  });