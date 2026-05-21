import TrainCard from './TrainCard';

// Компонент-контейнер для відображення списку. Отримує масив рейсів через пропси.
export default function TrainList({ trains }) {
  // Умовний рендеринг: якщо масив порожній (нічого не знайдено)
  if (trains.length === 0) {
    return <p>Рейсів не знайдено. Спробуйте змінити критерії пошуку.</p>;
  }

  return (
    <div className="train-list">
      {/* Проходимось методом map по масиву рейсів і рендеримо картку для кожного.
          Важливо: key={train.id} необхідний для оптимізації рендерингу в React */}
      {trains.map(train => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}