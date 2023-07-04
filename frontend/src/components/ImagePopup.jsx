import React from 'react';

function ImagePopup({ card, onClose }) {
  const { name, link } = card;
  return (
    <div className={`popup popup_type_image ${link && 'popup_opened'}`}>
      <figure className="popup__image-container">
        <button
          className="popup__close-icon popup__close-icon_type_image opacity"
          type="button"
          onClick={onClose}></button>
        <img alt={name} className="popup__image" src={link} />
        <figcaption className="popup__image-caption">{name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
