import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    function handleEditAvatarClick () {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick () {
        setEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick () {
        setAddPlacePopupOpen(true);
    }

    function handleZoomPlaceClick (card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setConfirmationPopupOpen(false);
        setImagePopupOpen(false);
    }

    return (
        <div className="page">
            <Header />
            <Main
                handleEditAvatarClick={handleEditAvatarClick}
                handleAddPlaceClick={handleAddPlaceClick}
                handleEditProfileClick={handleEditProfileClick}
                handleZoomPlaceClick={handleZoomPlaceClick}
            />
            <Footer />

            <PopupWithForm name={"popup_avatar"}
                           title={"Обновить аватар"}
                           buttonText={"Сохранить"}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}>
                            <input
                            id="avatar-link"
                            name="avatar-link"
                            className="popup__input"
                            type="url"
                            placeholder="Ссылка на фотографию"
                            required />
                            <span id="avatar-link-error" className="popup__error-message"></span>
            </PopupWithForm>

            <PopupWithForm name={"confirmation"}
                           title={"Вы уверены?"}
                           buttonText={"Да"}
                           isOpen={isConfirmationPopupOpen}
                           onClose={closeAllPopups}>
            </PopupWithForm>

            <PopupWithForm name={"profile"}
                           title={"Редактировать профиль"}
                           buttonText={"Сохранить"}
                           isOpen={isEditProfilePopupOpen}
                           onClose={closeAllPopups}>
                <input
                    id="name-profile"
                    name="name-profile"
                    className="popup__input"
                    type="text"
                    placeholder="Имя"
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
                    minLength="2"
                    maxLength="200"
                    required />
                <span id="description-profile-error" className="popup__error-message"></span>
            </PopupWithForm>

            <PopupWithForm name={"place"}
                           title={"Новое место"}
                           buttonText={"Создать"}
                           isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups}>
                <input
                    id="place-name"
                    name="place-name"
                    className="popup__input"
                    type="text"
                    placeholder="Название"
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
                    required />
                <span id="place-link-error" className="popup__error-message"></span>
            </PopupWithForm>

            <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups} />
             </div>
    )
}
export default App;