export default function SeatMap({ selectedSeats, setSelectedSeats, bookedSeats }) {
  // Генеруємо 40 місць
  const seats = Array.from({ length: 40 }, (_, i) => i + 1); 

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return; // Заброньовані не можна клікати
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat)); // Зняти вибір
    } else {
      setSelectedSeats([...selectedSeats, seat]); // Обрати
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '300px' }}>
      {seats.map(seat => {
        let bgColor = '#e8f5e9'; // вільні (зеленуваті)
        let color = '#333';
        
        if (bookedSeats.includes(seat)) {
          bgColor = '#ffebee'; // заброньовані (червонуваті)
          color = '#c62828';
        } else if (selectedSeats.includes(seat)) {
          bgColor = '#0056b3'; // обрані (сині)
          color = 'white';
        }

        return (
          <div 
            key={seat} 
            onClick={() => handleSeatClick(seat)}
            style={{
              padding: '10px', textAlign: 'center', cursor: bookedSeats.includes(seat) ? 'not-allowed' : 'pointer',
              backgroundColor: bgColor, color: color, borderRadius: '4px', fontWeight: 'bold',
              border: '1px solid #ccc'
            }}>
            {seat}
          </div>
        );
      })}
    </div>
  );
}