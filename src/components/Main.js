import React from "react";
import api from "../utils/Api";
import Card from "./Card";

export default function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("#");
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__ava">
            <img
              className="profile__foto"
              src={userAvatar}
            // style={{ backgroundImage: `url(${userAvatar})` }} 
              alt="Фото профиля"
            />
            <button
              className="profile__foto-btn"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__text">
            <div className="profile__text-first">
              <h1 className="profile__text-title">{userName}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__text-subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          className="button-add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="card">
        <ul className="card__list">
        {cards.map(card => (<Card key={card._id} card={card} onCardClick={props.onCardClick}/>))}
        </ul>
      </section>
    </main>
  );
}
