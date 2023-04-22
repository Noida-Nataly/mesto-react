export default function ImagePopup ({card, isOpen, onClose}) {
    const className = `popup ${isOpen ? 'popup_opened': ''}`;

    return (
        <div id="popup-zoom" className={className}>
            <div className="popup__container popup__container_type_zoom-image">
                <img className="popup__zoom-image" src={card.link} alt={card.name}/>
                    <button className="popup__close-button button close-popup"
                            type="button"
                            aria-label="Закрыть"
                            onClick={onClose}></button>
                    <h2 className="popup__comment">{card.name}</h2>
            </div>
        </div>
    );
}