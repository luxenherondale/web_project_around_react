// ImagePopup.jsx - Componente especial para mostrar imágenes
import React from "react";

export default function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup__space-image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__conteiner-image" id="image-popup">
        <button
          className="image__close"
          id="close-image-popup"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
        <img
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
          className="popup__image"
        />
        <p className="popup__caption">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}
