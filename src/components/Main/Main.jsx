// Main.jsx - Componente principal que contiene el contenido y gestiona los popups
import React, { useState, useEffect } from "react";

import Popup from "../Popups/Popups";
import EditProfileForm from "../Forms/EditProfileForm";
import AddCardForm from "../Forms/AddCardForm";
import EditAvatarForm from "../Forms/EditAvatarForm";
import DeleteConfirmation from "../Forms/DeleteConfirmation";
import ImagePopup from "../Popups/ImagePopup";
import Card from "./Card"; // Importamos el componente Card
import api from "../utils/api";
import vectorIcon from "../../images/Vector.png";

export default function Main({ currentUser, onUpdateUser }) {
  // Estados para las tarjetas
  const [cards, setCards] = useState([]);

  // Estado para los popups (siguiendo las instrucciones)
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Definimos los contenidos de los popups
  const editProfilePopup = {
    title: "Editar perfil",
    name: "edit-profile",
    children: (
      <EditProfileForm
        onSubmit={handleUpdateUser}
        userData={{ name: currentUser.name, about: currentUser.about }}
      />
    ),
  };

  const addCardPopup = {
    title: "Nuevo lugar",
    name: "add-card",
    children: <AddCardForm onSubmit={handleAddCard} />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    name: "profile-edit",
    children: <EditAvatarForm onSubmit={handleUpdateAvatar} />,
  };

  const deleteConfirmationPopup = {
    title: "¿Estás seguro/a?",
    name: "delete-confirmation",
    children: <DeleteConfirmation onSubmit={handleCardDelete} />,
  };

  // Cargar tarjetas cuando se monta el componente
  useEffect(() => {
    // Cargar tarjetas iniciales
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.error("Error al cargar tarjetas:", err));
  }, []);

  // Manejadores para abrir popups
  function handleOpenPopup(popupContent) {
    setPopup(popupContent);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  // Manejadores de eventos específicos
  const handleEditProfileClick = () => {
    handleOpenPopup(editProfilePopup);
  };

  const handleAddCardClick = () => {
    handleOpenPopup(addCardPopup);
  };

  const handleEditAvatarClick = () => {
    handleOpenPopup(editAvatarPopup);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteClick = (cardId) => {
    setCardToDelete(cardId);
    handleOpenPopup(deleteConfirmationPopup);
  };

  // Manejadores para enviar formularios
  function handleUpdateUser(userData) {
    api
      .updateUserData(userData)
      .then((newUserData) => {
        onUpdateUser(newUserData);
        handleClosePopup();
      })
      .catch((err) => console.error("Error al actualizar usuario:", err));
  }

  function handleUpdateAvatar(avatarData) {
    api
      .updateUserAvatar(avatarData)
      .then((newUserData) => {
        onUpdateUser({ ...currentUser, avatar: newUserData.avatar });
        handleClosePopup();
      })
      .catch((err) => console.error("Error al actualizar avatar:", err));
  }

  function handleAddCard(cardData) {
    api
      .createCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.error("Error al crear tarjeta:", err));
  }

  function handleCardDelete() {
    if (cardToDelete) {
      api
        .deleteCard(cardToDelete)
        .then(() => {
          setCards(cards.filter((card) => card._id !== cardToDelete));
          handleClosePopup();
        })
        .catch((err) => console.error("Error al eliminar tarjeta:", err));
    }
  }

  function handleCardLike(card) {
    // Verificar si card.likes existe y es un array antes de usar some
    const isLiked =
      card.likes &&
      Array.isArray(card.likes) &&
      card.likes.some((like) => like && like._id === currentUser._id);

    // Enviar solicitud a la API para actualizar el estado del like
    const likeRequest = isLiked
      ? api.unlikeCard(card._id)
      : api.likeCard(card._id);

    likeRequest
      .then((updatedCard) => {
        setCards(cards.map((c) => (c._id === card._id ? updatedCard : c)));
      })
      .catch((err) => console.error("Error al actualizar like:", err));
  }

  return (
    <main className="main">
      {/* Sección del perfil */}
      <section className="profile">
        {/* Hacemos clic en el contenedor de imagen para editar el avatar */}
        <div
          className="profile__image-container"
          onClick={handleEditAvatarClick}
        >
          <img
            src={currentUser.avatar || null}
            alt="fotodeperfil"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name" id="displayName">
            {currentUser.name}
          </h1>
          <p className="profile__description" id="displayJob">
            {currentUser.about}
          </p>
        </div>
        <button
          className="profile__edit-button"
          id="btn-open-popup"
          onClick={handleEditProfileClick}
          type="button"
        >
          <img src={vectorIcon} alt="lapiz editor de nombre" />
        </button>
        <button
          className="profile__add-button"
          id="add-button-card"
          onClick={handleAddCardClick}
          type="button"
        >
          {/* <img src="/images/AddButton.png" alt="boton agregar contenido" /> */}
        </button>
      </section>

      {/* Sección de tarjetas */}
      <section className="card">
        <div className="card__conteiner">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              currentUserId={currentUser._id}
            />
          ))}
        </div>
      </section>

      {/* Renderizado del Popup según las instrucciones */}
      {popup && (
        <Popup
          isOpen={true}
          onClose={handleClosePopup}
          title={popup.title}
          name={popup.name}
        >
          {popup.children}
        </Popup>
      )}

      {/* ImagePopup se maneja por separado */}
      <ImagePopup
        isOpen={selectedCard !== null}
        onClose={handleClosePopup}
        card={selectedCard}
      />
    </main>
  );
}
