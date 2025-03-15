// Popup.jsx - Componente base para todos los popups (refactorizado)
import React from "react";

export default function Popup({ isOpen, onClose, title, name, children }) {
  // Determinar qué clases usar según el nombre del popup
  let popupClass = "";
  let containerClass = "";
  let closeButtonClass = "";
  let titleClass = "";

  switch (name) {
    case "edit-profile":
      popupClass = "overlay";
      containerClass = "popup__container";
      closeButtonClass = "form__close-button";
      titleClass = "profile__form-tittle";
      break;
    case "add-card":
      popupClass = "addcard";
      containerClass = "popup_card";
      closeButtonClass = "form__close-button-card";
      titleClass = "card__form-tittle";
      break;
    case "delete-confirmation":
      popupClass = "delete-confirmation";
      containerClass = "popup_card";
      closeButtonClass = "form__close-button-card";
      titleClass = "card__form-tittle";
      break;
    case "profile-edit":
      popupClass = "profile-edit";
      containerClass = "popup_card";
      closeButtonClass = "form__close-button-card";
      titleClass = "profile__form-tittle";
      break;
    default:
      popupClass = "overlay";
      containerClass = "popup__container";
      closeButtonClass = "form__close-button";
      titleClass = "profile__form-tittle";
  }

  const popupId =
    name === "edit-profile"
      ? "popup-editprofile"
      : name === "add-card"
      ? "popup-addcard"
      : name === "delete-confirmation"
      ? "popup-deletecard"
      : name === "profile-edit"
      ? "popup-profile"
      : `popup-${name}`;

  const closeButtonId =
    name === "edit-profile"
      ? "btn-close-popup"
      : name === "add-card"
      ? "btn-close-popup-card"
      : name === "delete-confirmation"
      ? "btn-close-popup-deletecard"
      : name === "avatar-edit"
      ? "btn-close-popup-avatar"
      : `btn-close-popup-${name}`;

  return (
    <div className={`${popupClass} ${isOpen ? "active" : ""}`} id={name}>
      <div className={containerClass} id={popupId}>
        <div
          className={closeButtonClass}
          id={closeButtonId}
          onClick={onClose}
        ></div>

        {title && <h3 className={titleClass}>{title}</h3>}

        {children}
      </div>
    </div>
  );
}
