import { useState } from 'react';
import { trains } from '../data/trains';
import TrainCard from '../components/TrainCard';

export function Home() {
    const [search, setSearch] = useState('');

    const filteredTrains = trains.filter(train =>
        train.route.toLowerCasw().includes(search.toLowerCase()) ||
        train.number.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Пошук рейсів</h1>
            <input
                type="text"
                placeholder="Пошук за маршрутом або номером..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
            />
            {filteredTrains.map(train => (
                <TrainCard key={train.id} train={train} />
            ))}
        </div>
    )
}