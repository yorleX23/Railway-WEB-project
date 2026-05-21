// Компонент відповідає за інтерактивну сітку місць
export default function SeatMap({ selectedSeats, setSelectedSeats, bookedSeats }) {
  // Генеруємо масив з 40 чисел [1, 2, 3... 40] для відображення місць
  const seats = Array.from({ length: 40 }, (_, i) => i + 1); 

  // Функція обробки кліку по конкретному місцю
  const handleSeatClick = (seat) => {
    // Якщо місце вже заброньоване кимось іншим — ігноруємо клік
    if (bookedSeats.includes(seat)) return; 
    
    if (selectedSeats.includes(seat)) {
      // Якщо місце вже було обране нами — знімаємо вибір (фільтруємо масив)
      setSelectedSeats(selectedSeats.filter(s => s !== seat)); 
    } else {
      // Якщо місце вільне — додаємо його до масиву обраних
      setSelectedSeats([...selectedSeats, seat]); 
    }
  };

  return (
    <div className="seat-grid">
      {seats.map(seat => {
        // Визначаємо CSS клас в залежності від статусу місця
        let statusClass = 'free';
        if (bookedSeats.includes(seat)) statusClass = 'booked';
        else if (selectedSeats.includes(seat)) statusClass = 'selected';

        return (
          <div 
            key={seat} 
            onClick={() => handleSeatClick(seat)}
            className={`seat ${statusClass}`}
          >
            {seat}
          </div>
        );
      })}
    </div>
  );
}