import React from "react";

export default function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, handleSubmit}) {
    const className = `popup ${isOpen ? 'popup_opened': ''}`;

    return (
        <div className={className}>
            <div className="popup__container">
                <button className="popup__close-button button close-popup"
                        type="button"
                        aria-label="Закрыть"
                        onClick={onClose}>
                </button>
                <form id={name}
                      method = "post"
                      className="popup__content"
                      onSubmit={handleSubmit}
                      noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        className="popup__confirm-button"
                        type="submit">{buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}