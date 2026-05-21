import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SeatMap from '../components/SeatMap';
import WagonSelector from '../components/WagonSelector';
import BookingForm from '../components/BookingForm';
import { BookingService } from '../service/BookingService';

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  
  // Стани
  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
 

  // Завантаження броні з LocalStorage для конкретного потяга і вагона
  useEffect(() => {
    const existingBookings = BookingService.getBookedSeats(trainId, selectedWagon);
    setBookedSeats(existingBookings);
    setSelectedSeats([]); // Очищаємо обрані місця, якщо користувач перемкнув вагон
  }, [trainId, selectedWagon]);

  // Функція обробки форми бронювання
  const handleFinalizeBooking = (formData) => {
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце!");
      return;
    }
    
    // Збереження бронювання
    BookingService.saveBooking(trainId, selectedWagon, selectedSeats);
    
    toast.success(`Квитки успішно заброньовані для ${formData.name}!`);
    navigate('/'); // Повертаємо на головну сторінку
  };

 return (
    <div className="container" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Бронювання квитків (Рейс ID: {trainId})</h2>
      
      <WagonSelector selectedWagon={selectedWagon} setSelectedWagon={setSelectedWagon} />

      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        <div>
          <h3>Оберіть місця (Вагон {selectedWagon})</h3>
          <SeatMap 
            selectedSeats={selectedSeats} 
            setSelectedSeats={setSelectedSeats} 
            bookedSeats={bookedSeats} 
          />
        </div>
        
        {/* Використовуємо відокремлений компонент форми */}
        <BookingForm selectedSeats={selectedSeats} onSubmitBooking={handleFinalizeBooking} />
      </div>
    </div>
  );
}