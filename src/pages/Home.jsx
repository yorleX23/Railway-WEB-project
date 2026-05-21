import { useState } from 'react';
import { trains } from '../data/trains';
import TrainList from '../components/TrainList';

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredTrains = trains.filter(train => 
    train.route.toLowerCase().includes(search.toLowerCase()) || 
    train.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Розклад потягів Укрзалізниці 🚆</h2>
      <input 
        type="text" 
        className="search-input"
        placeholder="Пошук за маршрутом (наприклад: Київ) або номером..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TrainList trains={filteredTrains} /> 
    </div>
  );
}