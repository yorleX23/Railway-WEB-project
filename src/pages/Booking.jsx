import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SeatMap from '../components/SeatMap';
import WagonSelector from '../components/WagonSelector';

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();

  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });


useEffect(() => {
    const existingBookings = JSON.parse(localStorage.getItem(`bookings_${trainId}`)) || [];
    setBookedSeats(existingBookings);
}, [trainId]);


const handleBook = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
        toast.error('Будь ласка, виберіть місця для бронювання');
        return;
    }


const newBookings = [...bookedSeats, ...selectedSeats];
localStorage.setItem(`bookings_${trainId}`, JSON.stringify(newBookings));

toast.success(`Квитки успішно заброньовані для ${formData.name}!`);
navigate('/');
};

return (
    <div style={{ padding: '20px' }}>
      <h2>Бронювання квитків (Рейс ID: {trainId})</h2>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div>
          <h3>Оберіть місця у вагоні</h3>
          <SeatMap 
            selectedSeats={selectedSeats} 
            setSelectedSeats={setSelectedSeats} 
            bookedSeats={bookedSeats} 
          />
        </div>
        
        <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3>Ваші дані</h3>
          <input required type="text" placeholder="Ім'я" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required type="tel" placeholder="Телефон" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input required type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
          <p>Обрано місць: {selectedSeats.length}</p>
          <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}>
            Підтвердити бронювання
          </button>
        </form>
      </div>
    </div>
  );
}