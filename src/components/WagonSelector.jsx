export default function WagonSelector({ selectedWagon, setSelectedWagon }) {
  const wagons = [
    { id: 1, type: 'Купе' },
    { id: 2, type: 'Плацкарт' },
    { id: 3, type: 'Люкс' }
  ];

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #eaeaea' }}>
      <h3 style={{ marginTop: 0 }}>Оберіть вагон:</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {wagons.map(wagon => (
          <button
            key={wagon.id}
            onClick={() => setSelectedWagon(wagon.id)}
            style={{
              padding: '10px 20px',
              border: selectedWagon === wagon.id ? '2px solid #0056b3' : '1px solid #ccc',
              backgroundColor: selectedWagon === wagon.id ? '#e6f2ff' : 'white',
              color: selectedWagon === wagon.id ? '#0056b3' : '#333',
              cursor: 'pointer',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Вагон {wagon.id} ({wagon.type})
          </button>
        ))}
      </div>
    </div>
  );
}