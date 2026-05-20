import TrainCard from "./TrainCard";

export default function TrainList({ trains }) {
    if(trains.length ===0) {
        return <p>Рейсів не знайдено</p>
    }

   return (
    <div className="train-list">
      {trains.map(train => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}