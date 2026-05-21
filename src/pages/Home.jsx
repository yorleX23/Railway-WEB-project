import { useState, useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import TrainList from '../components/TrainList';

export default function Home() {
  // Дістаємо список рейсів та статус завантаження з глобального контексту
  const { trains, loading } = useContext(BookingContext);
  
  // Локальний стан для поля пошуку
  const [search, setSearch] = useState('');

  // Логіка фільтрації: перевіряємо, чи входить рядок пошуку в маршрут АБО номер потяга
  const filteredTrains = trains.filter(train => 
    train.route.toLowerCase().includes(search.toLowerCase()) || 
    train.number.toLowerCase().includes(search.toLowerCase())
  );

  // Відображаємо індикатор, поки fetch-запит не завершиться
  if (loading) return <div className="container"><h3>Завантаження рейсів з mock-API...</h3></div>;

  return (
    <div className="container">
      <h2>Розклад потягів Укрзалізниці 🚆</h2>
      {/* Контрольований інпут (контролюється через стан search) */}
      <input 
        type="text" 
        className="search-input"
        placeholder="Пошук за маршрутом або номером..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Передаємо відфільтрований список у дочірній компонент */}
      <TrainList trains={filteredTrains} /> 
    </div>
  );
}