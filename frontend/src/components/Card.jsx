import { useContext} from 'react';
import CurrentUserContext from '../contexts/user/CurrentUserContext';

function Card(card) {
  const {
    link,
    name,
    likes,
    onCardClick,
    onDelClick,
    onLikeClick,
    owner: { _id },
  } = card;
  const user = useContext(CurrentUserContext);
  const isOwner = _id === user._id;
  const isLiked = likes.some((like) => like._id === user._id);

  return (
    <article className="element">
      <img
        alt={name}
        className="element__image"
        src={link}
        onClick={() => onCardClick(link, name)}
      />
      <button
        className={`element__bin opacity ${isOwner ? '' : 'disabled'}`}
        onClick={()=> onDelClick(card._id)}></button>
      <div className="element__description">
        <h2 className="element__text">{name}</h2>
        <div className="element__fav-container">
          <button
            className={`element__fav opacity ${
              isLiked && 'element__fav_active'
            }`}
            type="button" onClick={()=> onLikeClick(card)}></button>
          <p className="element__fav-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
