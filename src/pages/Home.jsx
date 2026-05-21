// src/pages/Home.jsx
import { useState, useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import TrainList from '../components/TrainList';

export default function Home() {
  const { trains, loading } = useContext(BookingContext);
  const [search, setSearch] = useState('');

  const filteredTrains = trains.filter(train => 
    train.route.toLowerCase().includes(search.toLowerCase()) || 
    train.number.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="container"><h3>Завантаження рейсів з mock-API...</h3></div>;
  }

  return (
    <div className="container">
      <h2>Розклад потягів Укрзалізниці 🚆</h2>
      <input 
        type="text" 
        className="search-input"
        placeholder="Пошук за маршрутом або номером..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TrainList trains={filteredTrains} /> 
    </div>
  );
}