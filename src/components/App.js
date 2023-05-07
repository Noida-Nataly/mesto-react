import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfoResult, cardResult]) => {
                setCurrentUser(userInfoResult);
                setCards(cardResult);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }, [])

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

    function handleUpdateUser (currentUser) {
        api.editProfile(currentUser.name, currentUser.about).then((updatedUser) => {
            setCurrentUser(updatedUser);
            closeAllPopups();
        })
        .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar (currentUser) {
        api.updateAvatar(currentUser.avatar).then((updatedUser) => {
            setCurrentUser(updatedUser);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card.name, card.link).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike (card) {
        const isLiked = card.likes.some(like => like._id === currentUser._id);
        api.toggleLike(card._id, isLiked).then((newCard) => {
                setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
            })
        .catch((err) => {
            console.log(err);
        });
    }
    function handleCardDelete (card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((item) => item._id !== card._id))
        })
        .catch((err) => {
                console.log(err);
        });
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setConfirmationPopupOpen(false);
        setImagePopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    cards={cards}
                    handleEditAvatarClick={handleEditAvatarClick}
                    handleAddPlaceClick={handleAddPlaceClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleZoomPlaceClick={handleZoomPlaceClick}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                />
                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    />

                <PopupWithForm name="confirmation"
                               title="Вы уверены?"
                               buttonText="Да"
                               isOpen={isConfirmationPopupOpen}
                               onClose={closeAllPopups}>
                </PopupWithForm>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    handleUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;