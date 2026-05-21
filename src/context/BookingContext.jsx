// src/context/BookingContext.jsx
import { createContext, useState, useEffect } from 'react';
import { BookingService } from '../services/BookingService';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);

  // Глобальний стан навігації розробки за методичкою
  const [currentWagon, setCurrentWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Завантажуємо дані рейсів при ініціалізації додатка за допомогою fetch
  useEffect(() => {
    setLoading(true);
    BookingService.getTrains()
      .then(data => setTrains(data))
      .catch(err => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <BookingContext.Provider value={{
      trains,
      loading,
      currentWagon,
      setCurrentWagon,
      selectedSeats,
      setSelectedSeats
    }}>
      {children}
    </BookingContext.Provider>
  );
}