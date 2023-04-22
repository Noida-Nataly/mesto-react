import React from "react";

export default function Card({card, handleZoomPlaceClick}) {
    return (<li className="location__card" >
        <div className="location__wrapper">
            <img className="location__image"
                 src={card.link}
                 alt={card.name}
                 onClick={() => {
                     handleZoomPlaceClick(card)
                 }}/>
            <div>
                <button className="location__delete-button button"
                        type="button"
                        aria-label="Удалить место">
                </button>
            </div>
        </div>
        <div className="location__description">
            <h2 className="location__title">{card.name}</h2>
            <div className="location__like">
                <button className="location__like-button button"
                        type="button"
                        aria-label="Отметить избранное">
                </button>
                <span className="location__like-count"></span>
            </div>
        </div>
    </li>)
}