import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    item: {}
  });
console.log(selectedCard)
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false)
    setSelectedCard({
        isOpen: false,
        item: {}
      });
  }

  return (
    <div className="App">
      <body className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={setSelectedCard}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />
        <PopupWithForm
          name="author"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          btnText="Сохранить"
        >
          <div className="popup__input">
            <input
              id="author-name-input"
              type="text"
              name="name"
              placeholder="Имя"
              className="popup__info popup__info_input_name"
              minlength="2"
              maxlength="40"
              required=""
            />
            <span className="author-name-input-error popup__info-error">
              Необходимо написать ваше имя
            </span>
          </div>
          <div className="popup__input">
            <input
              id="job-author-input"
              type="text"
              name="about"
              placeholder="Вид деятельности"
              className="popup__info popup__info_input_job"
              minlength="2"
              maxlength="200"
              required=""
            />
            <span className="job-author-input-error popup__info-error">
              Необходимо написать вид вашей деятельности
            </span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name="ava"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          btnText="Сохранить"
        >
          <div className="popup__input">
            <input
              id="ava-link-input"
              type="url"
              name="avatar"
              placeholder="https://somewebsite.com/someimage.jpg"
              className="popup__info popup__info_input_ava-link"
              required=""
            />
            <span className="ava-link-input-error popup__info-error">
              Необходимо ввести ссылку на фото
            </span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name="card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          btnText="Создать"
        >
          <div className="popup__input">
            <input
              id="card-name-input"
              type="text"
              name="name"
              placeholder="Название"
              className="popup__info popup__info_input_card-name"
              minlength="2"
              maxlength="30"
              required=""
            />
            <span className="card-name-input-error popup__info-error">
              Необходимо напистаь название карточки
            </span>
          </div>
          <div className="popup__input">
            <input
              id="card-link-input"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              className="popup__info popup__info_input_card-link"
              required=""
            />
            <span className="card-link-input-error popup__info-error">
              Необходимо ввести ссылку на фото
            </span>
          </div>
        </PopupWithForm>
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
  );
}

export default App;
