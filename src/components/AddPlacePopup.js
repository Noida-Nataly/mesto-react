import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup ({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit (evt) {
        evt.preventDefault();
        const place = {name: name, link: link}
        onAddPlace(place);
        setName('');
        setLink('');
    }


    return (
        <PopupWithForm name="place"
                       title="Новое место"
                       buttonText="Создать"
                       isOpen={isOpen}
                       onClose={onClose}
                       handleSubmit={handleSubmit}
        >
            <input
                id="place-name"
                name="place-name"
                className="popup__input"
                type="text"
                placeholder="Название"
                value = {name ?? ''}
                onChange={handleNameChange}
                minLength="2"
                maxLength="30"
                required />
            <span id="place-name-error" className="popup__error-message"></span>
            <input
                id="place-link"
                name="place-link"
                className="popup__input"
                type="url"
                placeholder="Ссылка на картинку"
                value = {link ?? ''}
                onChange={handleLinkChange}
                required />
            <span id="place-link-error" className="popup__error-message"></span>
        </PopupWithForm>
    )
}