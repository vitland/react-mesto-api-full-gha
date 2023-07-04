import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import api from '../utils/api';
import authApi from '../utils/authUser';

import CurrentUserContext from '../contexts/user/CurrentUserContext';
import FormContextProvider from '../contexts/form/FormContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from '../routes/sign-in/Login';
import Register from '../routes/sign-up/Register';
import ProtectedRoute from '../routes/protected/ProtectedRoute';
import InfoToolTip from './InfoToolTip';

function App() {
  // Стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);

  const [cardId, setCardId] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [succsess, setSuccsess] = useState(false);
  //Данные в профиле
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    api
      .getUser()
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(err));
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    api
      .getCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.error(err));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    authApi
      .validateToken()
      .then(() => {
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.error(err);
      });
  }, [navigate, isLoggedIn]);

  //UserApi
  function handleSignUp(email, password) {
    authApi
      .signUp(email, password)
      .then(() => {
        setSuccsess(true);
        setIsInfoToolTipPopupOpen(true);
        navigate('/signin');
      })
      .catch((error) => {
        console.log(error);
        setSuccsess(false);
        setIsInfoToolTipPopupOpen(true);
      });
  }

  function handleSignIn(email, password) {
    authApi
      .signIn(email, password)
      .then((data) => {
        console.log(data);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setCurrentUser({});
        setSuccsess(false);
        setIsInfoToolTipPopupOpen(true);
      });
  }

  function handleSignOut() {
    authApi
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        setCurrentUser({});
        navigate('/signin', { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setSuccsess(false);
        setIsInfoToolTipPopupOpen(true);
      });
  }

  //Card Api
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function hadleUpdateUser(userData) {
    setIsLoading(true);
    api
      .editUser(userData)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAvatarUpdate(avatarObj) {
    setIsLoading(true);
    api
      .editUserAvatar(avatarObj)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(cardObj) {
    setIsLoading(true);
    api
      .addCard(cardObj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardClick(link, name) {
    setSelectedCard({ link, name });
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .toggleLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleRemoveIconClick(cardId) {
    setCardId(cardId);
    setIsConfirmPopupOpen(true);
  }

  function handleDeleteCard(cardId) {
    setIsLoading(true);
    api
      .removeCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className='content'>
      <CurrentUserContext.Provider value={currentUser}>
        <FormContextProvider>
          <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onLikeClick={handleLikeClick}
                        onDelClick={handleRemoveIconClick}
                      />
                      <Footer />
                    </>
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path='/signin' element={<Login onSignIn={handleSignIn} />} />
            <Route
              path='/signup'
              element={<Register onSignUp={handleSignUp} />}
            />
            <Route path='*' element={<h1 style={{ color: 'red' }}>404</h1>} />
          </Routes>

          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpen}
            onLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}></EditAvatarPopup>

          <EditProfilePopup
            isOpened={isEditProfilePopupOpen}
            onLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateUser={hadleUpdateUser}></EditProfilePopup>

          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onLoading={isLoading}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}></AddPlacePopup>

          <ConfirmPopup
            isOpened={isConfirmPopupOpen}
            onLoading={isLoading}
            cardId={cardId}
            onClose={closeAllPopups}
            onRemove={handleDeleteCard}></ConfirmPopup>

          <InfoToolTip
            isOpened={isInfoToolTipPopupOpen}
            name={'info-tool-tip'}
            isSuccsess={succsess}
            onClose={closeAllPopups}></InfoToolTip>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </FormContextProvider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
