import moment from 'moment';

export const convertDateToMilliseconds = (dateTimeInMills, timePart) => {
   const ddmmyyyy =  moment(dateTimeInMills).format("DD/MM/YYYY"); //get the day month and year part of date
   const dateInMils = moment(dateTimeInMills).valueOf();        // convert date to mill seconds
   //convert timepart (hh:mm:ss) to milliseconds
   const timeInMils = moment(timePart, 'HH:mm:ss: A').diff(moment().startOf('day'), 'milliseconds');
   //combine the date milliseconds and timepart milliseconds
   const finalDateTime = dateInMils + timeInMils;
   return finalDateTime;
} 
//Extract date from moment date (i.e. date in milliseconds)
export const getDateFromMillisec = (dateInMillis) => moment(dateInMillis).format("DD/MM/YYYY");
export const getTimeFromDate = (dateInMillisec) => moment(dateInMillisec).format("H:mm");

//Check if input time is great than current time
export const isAllowedBooking = (pickUpdate, pickupTime, hours) =>{
    //current datetime
    const currentDateTime = moment().valueOf();
    //extract date format
    const inputPickupDate = getDateFromMillisec(pickUpdate);
    //convert combine pickup datetime
    const pickupDateTime = inputPickupDate +' '+pickupTime;
    //convert combined time to millisecs
    const pickupDateTimeInMillisecs = moment(pickupDateTime, "D/M/YYYY H:mm").valueOf()
    //check if pickup datetime meet requirement
    const timeToPickup = pickupDateTimeInMillisecs - currentDateTime;
    //convert hours to milliseconds
    const hoursInMillisecs = convertHoursToMillisec(hours);
    //perform check to see if pickup datetime is allowed
    if( timeToPickup > hoursInMillisecs) {
        console.log(pickupDateTimeInMillisecs);
        console.log(currentDateTime);
        return true;
    }else{
        return false;
    }
}
export const convertHoursToMillisec  = (hours) => {
    //convert hours string to a float number 
    const hoursPart = parseFloat(hours);
    //convert hours to milliseconds
    const hoursToMillsecs = hoursPart * (1000 * 60 * 60);
    return hoursToMillsecs;
}



