import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  //попап удаления
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    item: {},
  });

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  //попап удаления
  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      item: {},
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card){
    api.deleteCard(card._id)
    .then((newCard) => {
      const newCards = cards.filter((c) =>
        c._id === card._id ? "" : newCard
      );
      setCards(newCards);
    })
    .catch((err) => console.log(err));
  }
  

  function handleUpdateUser(name, about) {
    api
      .editUserInfo(name, about)
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, id: _id });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editUserAvatar(avatar)
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, id: _id });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <body className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={setSelectedCard}
            // onCardDeletePopup={handleDeleteCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            btnText="Да"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </body>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
