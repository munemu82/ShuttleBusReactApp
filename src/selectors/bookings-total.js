export default (bookings) =>{
   return bookings
            .map((booking) => booking.tripPrice)
            .reduce((sum, value) => sum + value, 0);
};