import { createContext, useState, useEffect } from 'react';
import { BookingService } from '../services/BookingService';

// Створюємо контекст для уникнення "prop drilling" (передачі пропсів через багато рівнів)
export const BookingContext = createContext();

export function BookingProvider({ children }) {
  // Глобальні стани, доступні на всіх сторінках
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentWagon, setCurrentWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // useEffect запускається один раз при монтуванні провайдера
  // Тут ми робимо ініціалізаційний запит до нашого mock-API
  useEffect(() => {
    setLoading(true);
    BookingService.getTrains()
      .then(data => setTrains(data))
      .catch(err => console.error("Помилка API:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    // Передаємо всі стани та функції оновлення у Provider, щоб будь-який компонент міг їх використати
    <BookingContext.Provider value={{
      trains, loading,
      currentWagon, setCurrentWagon,
      selectedSeats, setSelectedSeats
    }}>
      {children}
    </BookingContext.Provider>
  );
}