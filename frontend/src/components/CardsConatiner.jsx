import Card from './Card';
function CardsConatiner({ cards, onCardClick, onLikeClick, onDelClick }) {
  if (!cards) {
    return 1;
  }
  return (
    <section className='elements'>
      {cards.map((card) => (
        <Card
          key={card._id}
          {...card}
          onCardClick={onCardClick}
          onLikeClick={onLikeClick}
          onDelClick={onDelClick}
        />
      ))}
    </section>
  );
}

export default CardsConatiner;
