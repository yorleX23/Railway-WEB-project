import { Link } from "react-router-dom";

    export function TrainCard({ train }) {
        return (
            <div style={{ border: '1px solid #ccc', padding: '16px', margin: '10px', borderRadius: '8px' }}>
                <h3>Потяг: {train.number}</h3>
                 <p><strong>Маршрут:</strong> {train.route}</p>
                 <p><strong>Відправлення:</strong> {train.departure}</p>
                 <p><strong>У дорозі:</strong> {train.duration}</p>
                 <Link to={ `/booking/${train.id}` }>
                 <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Обрати місця</button>
                 </Link>
            </div>
        );
}