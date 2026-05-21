import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SeatMap from '../components/SeatMap';
import WagonSelector from '../components/WagonSelector';

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  
  // Стани
  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  // Завантаження броні з LocalStorage для конкретного потяга і вагона
  useEffect(() => {
    const existingBookings = JSON.parse(localStorage.getItem(`booking_${trainId}_wagon_${selectedWagon}`)) || [];
    setBookedSeats(existingBookings);
    setSelectedSeats([]); // Очищаємо обрані місця, якщо користувач перемкнув вагон
  }, [trainId, selectedWagon]);

  // Функція обробки форми бронювання
  const handleBook = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце!");
      return;
    }
    
    // Збереження бронювання
    const newBookings = [...bookedSeats, ...selectedSeats];
    localStorage.setItem(`booking_${trainId}_wagon_${selectedWagon}`, JSON.stringify(newBookings));
    
    toast.success(`Квитки успішно заброньовані для ${formData.name}!`);
    navigate('/'); // Повертаємо на головну сторінку
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Бронювання квитків (Рейс ID: {trainId})</h2>
      
      {/* Компонент вибору вагона */}
      <WagonSelector selectedWagon={selectedWagon} setSelectedWagon={setSelectedWagon} />

      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        <div>
          <h3>Оберіть місця (Вагон {selectedWagon})</h3>
          {/* Компонент карти місць */}
          <SeatMap 
            selectedSeats={selectedSeats} 
            setSelectedSeats={setSelectedSeats} 
            bookedSeats={bookedSeats} 
          />
        </div>
        
        {/* Форма даних користувача */}
        <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '250px' }}>
          <h3>Ваші дані</h3>
          <input required type="text" placeholder="Ім'я" onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input required type="tel" placeholder="Телефон" onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input required type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          
          <p>Обрано місць: <strong>{selectedSeats.length}</strong></p>
          
          <button type="submit" style={{ padding: '12px', backgroundColor: '#0056b3', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Підтвердити бронювання
          </button>
        </form>
      </div>
    </div>
  );
}