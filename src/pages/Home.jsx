import { useState } from 'react';
import { trains } from '../data/trains';
import TrainList from '../components/TrainList';

export function Home() {
    const [search, setSearch] = useState('');

    const filteredTrains = trains.filter(train =>
        train.route.toLowerCasw().includes(search.toLowerCase()) ||
        train.number.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Пошук рейсів</h1>
            <input
                type="text"
                placeholder="Пошук за маршрутом або номером..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
               style={{ padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            
          <TrainList trains={filteredTrains}/>
        </div>
    );
}