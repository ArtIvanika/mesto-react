import React from "react"


function Card({card, onCardClick}){

    const handleCardClick =() => {
       onCardClick({
            isOpen: true,
            item: card});    
      }  
     
    return(
          <li className="card__item">
            <button className="card__delete" type="button"></button>
            <img className="card__foto" onClick={handleCardClick} src={card.link} alt={card.name} />
            <div className="card__text">
              <h2 className="card__title">{card.name}</h2>
              <div className="card__like">
                <button className="card__heart" type="button"></button>
                <h3 className="card__like-sum">{card.likes.length}</h3>
              </div>
            </div>
          </li>
   
    )
}
export default Card