export default function SeatMap({ selectedSeats, setSelectedSeats, bookestSeats }) {
    const seats = Array.from({length: 40}, (_, i) => i + 1);

    const handleSeatClick = (seat) => {
        if (bookestSeats.includes(seat)) return; // Забороняємо вибір зайнятих місць

        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '300px' }}>
      {seats.map(seat => {
        let bgColor = 'lightgreen'; // вільні
        if (bookedSeats.includes(seat)) bgColor = 'tomato'; // заброньовані
        else if (selectedSeats.includes(seat)) bgColor = 'lightblue'; // обрані

        return (
          <div 
            key={seat} 
            onClick={() => handleSeatClick(seat)}
            style={{
              padding: '10px', textAlign: 'center', cursor: 'pointer',
              backgroundColor: bgColor, borderRadius: '4px', fontWeight: 'bold'
            }}>
            {seat}
          </div>
        );
      })}
    </div>
  );
}