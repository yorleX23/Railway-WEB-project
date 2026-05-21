// Цей сервіс відповідає за взаємодію з даними (імітація реальних API запитів)
export const BookingService = {
  
  // Асинхронна функція для отримання списку рейсів
  getTrains: async () => {
    // Використовуємо нативний fetch для читання JSON-файлу
    const response = await fetch('/trains.json');
    if (!response.ok) throw new Error('Помилка завантаження рейсів');
    return await response.json();
  },

  // Отримання вже заброньованих місць з імітацією мережевої затримки (Promise + setTimeout)
  getBookedSeats: async (trainId, wagonId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Дані тягнемо з localStorage, формуючи унікальний ключ для кожного вагону
        const data = localStorage.getItem(`booking_${trainId}_wagon_${wagonId}`);
        resolve(data ? JSON.parse(data) : []);
      }, 300); // 300мс затримки для реалістичності
    });
  },

  // Збереження нового бронювання
  saveBooking: async (trainId, wagonId, selectedSeats) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = localStorage.getItem(`booking_${trainId}_wagon_${wagonId}`);
        const existingBookings = data ? JSON.parse(data) : [];
        
        // Об'єднуємо старі бронювання з новими обраними місцями
        const newBookings = [...existingBookings, ...selectedSeats];
        
        // Зберігаємо оновлений масив назад у localStorage
        localStorage.setItem(`booking_${trainId}_wagon_${wagonId}`, JSON.stringify(newBookings));
        resolve(newBookings);
      }, 300);
    });
  }
};