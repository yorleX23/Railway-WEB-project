export default function WagonSelector({ selectedWagon, setSelectedWagon }) {
  const wagons = [
    { id: 1, type: 'Купе' },
    { id: 2, type: 'Плацкарт' },
    { id: 3, type: 'Люкс' }
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>Оберіть вагон:</h4>
      <div style={{ display: 'flex', gap: '10px' }}>
        {wagons.map(wagon => (
          <button
            key={wagon.id}
            onClick={() => setSelectedWagon(wagon.id)}
            style={{
              padding: '10px',
              border: selectedWagon === wagon.id ? '2px solid #0056b3' : '1px solid #ccc',
              backgroundColor: selectedWagon === wagon.id ? '#e6f2ff' : 'white',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            Вагон {wagon.id} ({wagon.type})
          </button>
        ))}
      </div>
    </div>
  );
}