import PopupWithForm from "./PopupWithForm";
import React from "react";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
          isOpen,
          onClose,
          handleUpdateUser}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit (evt) {
        evt.preventDefault();
        const user = {name: name, about: description}
        handleUpdateUser(user);

    }

    return (
        <PopupWithForm name="profile"
                       title="Редактировать профиль"
                       buttonText="Сохранить"
                       isOpen={isOpen}
                       onClose={onClose}
                       handleSubmit={handleSubmit}>
            <input
                id="name-profile"
                name="name-profile"
                className="popup__input"
                type="text"
                placeholder="Имя"
                value = {name ?? ''}
                onChange={handleNameChange}
                minLength="2"
                maxLength="40"
                required />
            <span id="name-profile-error" className="popup__error-message"></span>
            <input
                id="description-profile"
                name="description-profile"
                className="popup__input"
                type="text"
                placeholder="Информация о себе"
                value = {description ?? ''}
                onChange={handleDescriptionChange}
                minLength="2"
                maxLength="200"
                required />
            <span id="description-profile-error" className="popup__error-message"></span>
        </PopupWithForm>
    )
}