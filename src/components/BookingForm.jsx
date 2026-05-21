import { useState } from 'react';

// Компонент форми для введення персональних даних (Контрольована форма)
export default function BookingForm({ selectedSeats, onSubmitBooking }) {
  // Локальний стан форми, який зберігає введені дані
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  // Обробник натискання кнопки "Submit"
  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігаємо стандартному перезавантаженню сторінки при відправці форми
    onSubmitBooking(formData); // Передаємо зібрані дані в батьківський компонент
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0, color: '#1a1a1a' }}>Дані пасажира</h3>
      
      {/* Атрибут required забезпечує базову HTML5 валідацію.
          onChange оновлює конкретне поле в об'єкті formData */}
      <input 
        required type="text" placeholder="Ім'я та Прізвище" className="form-input"
        onChange={e => setFormData({...formData, name: e.target.value})} 
      />
      <input 
        required type="tel" placeholder="Номер телефону" className="form-input"
        onChange={e => setFormData({...formData, phone: e.target.value})} 
      />
      <input 
        required type="email" placeholder="Email" className="form-input"
        onChange={e => setFormData({...formData, email: e.target.value})} 
      />
      
      {/* Інформаційний блок, що динамічно показує номери обраних місць */}
      <div className="summary-box">
        <p style={{ margin: 0 }}>Обрано місць: <strong>{selectedSeats.length}</strong></p>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
          {selectedSeats.length > 0 ? `Номери: ${selectedSeats.join(', ')}` : 'Будь ласка, оберіть місця на схемі'}
        </p>
      </div>
      
      <button type="submit" className="btn-primary" style={{ width: '100%' }}>Оплатити та Забронювати</button>
    </form>
  );
}