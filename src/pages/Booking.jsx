import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SeatMap from '../components/SeatMap';
import WagonSelector from '../components/WagonSelector';
import BookingForm from '../components/BookingForm';
import { BookingService } from '../services/BookingService';
import { BookingContext } from '../context/BookingContext';

export default function Booking() {
  // useParams дістає параметр trainId з URL-адреси
  const { trainId } = useParams();
  // useNavigate дозволяє програмно перенаправляти користувача між сторінками
  const navigate = useNavigate();
  
  // Підключаємо необхідні дані з Context API
  const { trains, currentWagon, setCurrentWagon, selectedSeats, setSelectedSeats } = useContext(BookingContext);

  // Локальні стани специфічні для цієї сторінки
  const [bookedSeats, setBookedSeats] = useState([]);
  const [fetchingSeats, setFetchingSeats] = useState(false);

  // Знаходимо об'єкт потрібного потяга за ID
  const train = trains.find(t => t.id === parseInt(trainId));

  // Ефект спрацьовує при зміні потяга або вагона, щоб підтягнути актуальні зайняті місця
  useEffect(() => {
    setFetchingSeats(true);
    BookingService.getBookedSeats(trainId, currentWagon)
      .then(seats => {
        setBookedSeats(seats);
        setSelectedSeats([]); // Очищуємо вибір користувача, якщо він перемкнув вагон
      })
      .catch(() => toast.error("Помилка синхронізації з API"))
      .finally(() => setFetchingSeats(false));
  }, [trainId, currentWagon, setSelectedSeats]);

  // Обробник фінального етапу бронювання
  const handleFinalizeBooking = async (formData) => {
    // Валідація: не можна забронювати 0 місць
    if (selectedSeats.length === 0) {
      toast.error("Оберіть хоча б одне місце на схемі!");
      return;
    }
    
    try {
      // Асинхронно зберігаємо дані через сервіс
      await BookingService.saveBooking(trainId, currentWagon, selectedSeats);
      toast.success(`Квитки успішно заброньовані для ${formData.name}!`);
      setSelectedSeats([]); // Очищуємо стан після успіху
      navigate('/'); // Повертаємо на головну
    } catch {
      toast.error("Не вдалося зберегти бронювання.");
    }
  };

  if (!train) return <div className="container"><h3>Рейс оновлюється або не знайдений...</h3></div>;

  return (
    <div className="container">
      <button className="btn-back" onClick={() => navigate('/')}>← Повернутися до списку</button>
      <h2 style={{ marginTop: '10px' }}>Оформлення: Потяг {train.number} ({train.route}) 🎫</h2>
      
      {/* Компонент вибору вагона (оновлює глобальний стан currentWagon) */}
      <WagonSelector selectedWagon={currentWagon} setSelectedWagon={setCurrentWagon} />

      <div className="booking-layout">
        <div className="seat-map-wrapper">
          <h3 style={{ marginTop: 0, textAlign: 'center' }}>Схема вагону №{currentWagon}</h3>
          {/* Відображення карти місць або індикатора завантаження */}
          {fetchingSeats ? <p style={{ textAlign: 'center' }}>Оновлення схеми...</p> : 
            <SeatMap selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bookedSeats={bookedSeats} />
          }
        </div>
        
        {/* Компонент форми приймає обрані місця та функцію обробки сабміту */}
        <BookingForm selectedSeats={selectedSeats} onSubmitBooking={handleFinalizeBooking} />
      </div>
    </div>
  );
}