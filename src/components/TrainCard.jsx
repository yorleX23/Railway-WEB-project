import { Link } from 'react-router-dom';

export default function TrainCard({ train }) {
  return (
    <div className="train-card" >
      <div className="train-info">
        <h3>Потяг: {train.number}</h3>
        <p ><strong>Маршрут:</strong> {train.route}</p>
        <p ><strong>Відправлення:</strong> {train.departure}</p>
        <p ><strong>У дорозі:</strong> {train.duration}</p>
      </div>
      <Link to={`/booking/${train.id}`}className="btn-primary">
          Обрати місця
      </Link>
    </div>
  );
}