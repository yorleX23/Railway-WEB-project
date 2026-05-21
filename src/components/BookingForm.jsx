import {useState} from "react";

export default function BookingForm({ selectedSeats, onSubmitBooking }) {
    const [formData, setFormData] = useState({name: '', phone: '', email: ''});

   const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmitBooking(formData);
   }

return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h3 style={{marginTop: 0, color: '#1a1a1a'}}>Ваші дані</h3>

      <input 
        required type="text" placeholder="Ім'я та Прізвище" 
        className="form-input"
        onChange={e => setFormData({...formData, name: e.target.value})} 
        
      />
      <input 
        required type="tel" placeholder="Номер телефону" 
        onChange={e => setFormData({...formData, phone: e.target.value})} 
        className="form-input"
      />
      <input 
        required type="email" placeholder="Email" 
        onChange={e => setFormData({...formData, email: e.target.value})} 
        className="form-input"
      />
      
      <div className="summary-box">
       <p style={{ margin: 0 }}>Обрано місць: <strong>{selectedSeats.length}</strong></p>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
          {selectedSeats.length > 0 ? `Номери: ${selectedSeats.join(', ')}` : 'Будь ласка, оберіть місця на схемі'}
        </p>
      </div>
      
      
      <button type="submit" className="btn-primary" style={{ width: '100%'}}>
        Підтвердити бронювання
      </button>
    </form>
  );
}