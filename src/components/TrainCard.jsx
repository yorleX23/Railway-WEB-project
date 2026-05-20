import { Link } from 'react-router-dom';

export default function TrainCard({ train }) {
  return (
    <div className="train-card" style={{ border: '1px solid #ccc', padding: '16px', margin: '10px 0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h3 style={{ margin: '0 0 10px 0' }}>Потяг: {train.number}</h3>
        <p style={{ margin: '5px 0' }}><strong>Маршрут:</strong> {train.route}</p>
        <p style={{ margin: '5px 0' }}><strong>Відправлення:</strong> {train.departure}</p>
        <p style={{ margin: '5px 0' }}><strong>У дорозі:</strong> {train.duration}</p>
      </div>
      <Link to={`/booking/${train.id}`}>
        <button style={{ padding: '10px 20px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Обрати місця
        </button>
      </Link>
    </div>
  );
}