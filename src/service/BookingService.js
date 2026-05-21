export const BookingService = {
    getBookedSeats: (trainId, wagonId) => {
        const data = localStorage.getItem(`booking_${trainId}_wagon_${wagonId}`);
        return data ? JSON.parse(data) : [];
    },

    saveBooking: (trainId, wagonId, selectedSeats) => {
        const existingBookings = BookingService.getBookedSeats(trainId, wagonId);
        const newBookings = [...existingBookings, ...selectedSeats];
        localStorage.setItem(`booking_${trainId}_wagon_${wagonId}`, JSON.stringify(newBookings));
        return newBookings;
    }
};