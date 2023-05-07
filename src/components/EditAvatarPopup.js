import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef();

    React.useEffect(() => {
        isOpen && (avatarRef.current.value = currentUser.avatar);
    }, [currentUser, isOpen]);

    function handleSubmit (evt) {
        evt.preventDefault();

        onUpdateAvatar ({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name="popup_avatar"
                       title="Обновить аватар"
                       buttonText="Сохранить"
                       isOpen={isOpen}
                       onClose={onClose}
                       handleSubmit={handleSubmit}>
            <input
                id="avatar-link"
                name="avatar-link"
                className="popup__input"
                type="url"
                placeholder="Ссылка на фотографию"
                ref={avatarRef}
                required />
            <span id="avatar-link-error" className="popup__error-message"></span>
        </PopupWithForm>
    )
}