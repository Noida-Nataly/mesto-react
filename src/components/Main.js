import React, {useEffect} from 'react';
import {api} from "../utils/Api.js";
import Card from "./Card";

export default function Main({
        handleEditAvatarClick,
        handleEditProfileClick,
        handleAddPlaceClick,
        handleZoomPlaceClick
        }) {
    const [profileAvatar, onAvatarChange] = React.useState("https://images.unsplash.com/photo-1537913454156-7c2b060a76e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNsb3dufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
    const [profileName, onNameChange] = React.useState('');
    const [profileDescription, onDescriptionChange] = React.useState('');
    const [cards, onCardsLoading] = React.useState([]);
    const initialCardsPromise = api.getInitialCards();
    const userInfoPromise = api.getUserInfo();

    useEffect(() => {
        Promise.all([userInfoPromise, initialCardsPromise])
            .then(([userInfoResult, initialCardsResult]) => {
                onAvatarChange(userInfoResult.avatar);
                onNameChange(userInfoResult.name);
                onDescriptionChange(userInfoResult.about);
                onCardsLoading(initialCardsResult);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }, [])

    return(
        <main>
            <section className="profile container">
                <button className="profile__avatar"
                aria-label="Изменить фотографию профиля"
                onClick={handleEditAvatarClick}>
                    <img
                        src= {profileAvatar}
                        alt="Аватар профиля" className="profile__avatar-image"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{profileName}</h1>
                    <button className="profile__edit-button button"
                            type="button"
                            aria-label="Редактировать профиль"
                            onClick={handleEditProfileClick}>
                    </button>
                    <p className="profile__description">{profileDescription}</p>
                </div>
                <button className="profile__add-button button"
                        type="button"
                        aria-label="Добавить профиль"
                        onClick={handleAddPlaceClick}>
                </button>
            </section>
            <section className="location container">
                <ul className="location__list">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            handleZoomPlaceClick={handleZoomPlaceClick} />
                            ))}
                </ul>
            </section>
        </main>
    );
}