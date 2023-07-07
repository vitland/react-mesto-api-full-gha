import { useContext } from 'react';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import CardsConatiner from './CardsConatiner';

function Main(props) {
  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
  } = props;

  const { avatar, name, about } = useContext(CurrentUserContext);
  return (
    <main className='main'>
      <section className='profile content__profile'>
        <div className='profile__avatar-container' onClick={onEditAvatar}>
          <img alt='аватар' className='profile__avatar' src={avatar} />
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{name}</h1>
          <p className='profile__occupation'>{about}</p>
          <button
            className='profile__button-change opacity'
            type='button'
            onClick={onEditProfile}></button>
        </div>
        <button
          className='profile__button-add opacity'
          type='button'
          onClick={onAddPlace}></button>
      </section>
      <CardsConatiner {...props}
      />
    </main>
  );
}

export default Main;
