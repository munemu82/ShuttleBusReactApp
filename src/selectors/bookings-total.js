export default (bookings) =>{
    if(bookings.length === 0){
        return 0
    }else {
        return bookings
            .map((booking) => booking.tripPrice)
            .reduce((sum, value) => sum + value, 0);
    }
};