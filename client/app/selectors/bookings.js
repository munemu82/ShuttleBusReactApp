//get visible bookings
export default (bookings, {clientName, sortBy, pickupDate}) => {
    const newbookings = Array.from(bookings);
    return newbookings.filter((booking) => {
        const pickupDateMatch = typeof pickupDate !== 'number' || booking.createdAt >= pickupDate;
        const clientNameMatch = booking.clientName.toLowerCase().includes(clientName.toLowerCase());
        return pickupDateMatch && clientNameMatch;
    }).sort(( a, b)  => {
        if(sortBy === 'pickupDate'){
            return a.pickupDate < b.pickupDate ? 1 : -1;
        }else if(sortBy === 'tripPrice'){
            return a.tripPrice < b.tripPrice ? 1 : -1;
        }
    });
};