import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SeatMap from '../components/SeatMap';
import WagonSelector from '../components/WagonSelector';
import BookingForm from '../components/BookingForm';
import { BookingService } from '../services/BookingService';
import { BookingContext } from '../context/BookingContext';

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate(); // Хук для навігації
  
  const { 
    trains,
    currentWagon, 
    setCurrentWagon, 
    selectedSeats, 
    setSelectedSeats 
  } = useContext(BookingContext);

  const [bookedSeats, setBookedSeats] = useState([]);
  const [fetchingSeats, setFetchingSeats] = useState(false);

  const train = trains.find(t => t.id === parseInt(trainId));

  useEffect(() => {
    setFetchingSeats(true);
    BookingService.getBookedSeats(trainId, currentWagon)
      .then(seats => {
        setBookedSeats(seats);
        setSelectedSeats([]); 
      })
      .catch(() => toast.error("Помилка синхронізації з API"))
      .finally(() => setFetchingSeats(false));
  }, [trainId, currentWagon, setSelectedSeats]);

  const handleFinalizeBooking = async (formData) => {
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце на схемі!");
      return;
    }
    
    try {
      await BookingService.saveBooking(trainId, currentWagon, selectedSeats);
      toast.success(`Квитки успішно заброньовані для ${formData.name}!`);
      setSelectedSeats([]); 
      navigate('/');
    } catch {
      toast.error("Не вдалося зберегти бронювання.");
    }
  };

  if (!train) return <div className="container"><h3>Рейс оновлюється або не знайдений...</h3></div>;

  return (
    <div className="container">
      {/* Кнопка повернення */}
      <button className="btn-back" onClick={() => navigate('/')}>
        ← Повернутися до списку
      </button>

      <h2 style={{ marginTop: '10px' }}>Оформлення: Потяг {train.number} ({train.route}) 🎫</h2>
      
      <WagonSelector selectedWagon={currentWagon} setSelectedWagon={setCurrentWagon} />

      <div className="booking-layout">
        {/* Контейнер для центрування схеми вагону */}
        <div className="seat-map-wrapper">
          <h3 style={{ marginTop: 0, textAlign: 'center' }}>Схема вагону №{currentWagon}</h3>
          {fetchingSeats ? (
            <p style={{ textAlign: 'center' }}>Оновлення схеми...</p>
          ) : (
            <SeatMap 
              selectedSeats={selectedSeats} 
              setSelectedSeats={setSelectedSeats} 
              bookedSeats={bookedSeats} 
            />
          )}
        </div>
        
        <BookingForm 
          selectedSeats={selectedSeats} 
          onSubmitBooking={handleFinalizeBooking} 
        />
      </div>
    </div>
  );
}