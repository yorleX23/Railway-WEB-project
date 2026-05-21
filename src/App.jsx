import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { BookingProvider } from './context/BookingContext';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Booking from './pages/Booking';

export default function App() {
  return (
    // BookingProvider огортає весь додаток, надаючи доступ до глобального стану (Single Source of Truth)
    <BookingProvider>
      {/* BrowserRouter відповідає за навігацію без перезавантаження сторінки (SPA) */}
      <BrowserRouter>
        <Routes>
          {/* Головна сторінка зі списком рейсів */}
          <Route path="/" element={<Home />} />
          {/* Сторінка бронювання з динамічним параметром :trainId */}
          <Route path="/booking/:trainId" element={<Booking />} />
        </Routes>
        
        {/* Контейнер для спливаючих сповіщень (успішне бронювання або помилки) */}
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </BookingProvider>
  );
}