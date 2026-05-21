// src/services/BookingService.js

export const BookingService = {
  // 1. Отримання списку рейсів через справжній fetch
  getTrains: async () => {
    const response = await fetch('/trains.json');
    if (!response.ok) {
      throw new Error('Помилка завантаження даних рейсів');
    }
    return await response.json();
  },

  // 2. Асинхронне отримання заброньованих місць з імітацією API-запиту
  getBookedSeats: async (trainId, wagonId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(`booking_${trainId}_wagon_${wagonId}`);
        resolve(data ? JSON.parse(data) : []);
      }, 300); // Затримка відповіді сервера
    });
  },

  // 3. Асинхронне збереження бронювання в localStorage
  saveBooking: async (trainId, wagonId, selectedSeats) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(`booking_${trainId}_wagon_${wagonId}`);
        const existingBookings = data ? JSON.parse(data) : [];
        const newBookings = [...existingBookings, ...selectedSeats];
        localStorage.setItem(`booking_${trainId}_wagon_${wagonId}`, JSON.stringify(newBookings));
        resolve(newBookings);
      }, 300);
    });
  }
};