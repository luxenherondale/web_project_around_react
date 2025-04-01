// Main.jsx - Componente principal que contiene el contenido y gestiona los popups
import React, { useState, useEffect, useContext } from "react";

import Popup from "../Popups/Popups";
import EditProfileForm from "../Forms/EditProfileForm";
import AddCardForm from "../Forms/AddCardForm";
import EditAvatarForm from "../Forms/EditAvatarForm";
import DeleteConfirmation from "../Forms/DeleteConfirmation";
import ImagePopup from "../Popups/ImagePopup";
import Card from "./Card";
import api from "../utils/api";
import vectorIcon from "../../images/Vector.png";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({
  onUpdateUser,
  onOpenPopup,
  onClosePopup,
  popup,
  selectedCard,
  setSelectedCard,
}) {
  // Obtenemos el usuario actual del contexto
  const { currentUser } = useContext(CurrentUserContext);

  // Estados para las tarjetas
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Definimos los contenidos de los popups
  const editProfilePopup = {
    title: "Editar perfil",
    name: "edit-profile",
    children: <EditProfileForm onSubmit={handleUpdateUser} />,
  };

  const addCardPopup = {
    title: "Nuevo lugar",
    name: "add-card",
    children: <AddCardForm onSubmit={handleAddCard} />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    name: "profile-edit",
    children: <EditAvatarForm />,
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
        // Procesar las tarjetas para añadir el estado de likes
        const processedCards = cardsData.map((card) => {
          // Verificar si el array de likes existe y es un array
          const likesArray = Array.isArray(card.likes) ? card.likes : [];

          // Verificar si el usuario actual ha dado like
          const isLiked = likesArray.some(
            (like) => like && like._id === currentUser._id
          );

          return {
            ...card,
            isLiked,
          };
        });

        setCards(processedCards);
      })
      .catch((err) => console.error("Error al cargar tarjetas:", err));
  }, [currentUser._id]);

  // Manejadores de eventos específicos
  const handleEditProfileClick = () => {
    onOpenPopup(editProfilePopup);
  };

  const handleAddCardClick = () => {
    onOpenPopup(addCardPopup);
  };

  const handleEditAvatarClick = () => {
    onOpenPopup(editAvatarPopup);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteClick = (cardId) => {
    setCardToDelete(cardId);
    onOpenPopup(deleteConfirmationPopup);
  };

  // Manejadores para enviar formularios
  function handleUpdateUser(userData) {
    onUpdateUser(userData);
  }

  function handleAddCard(cardData) {
    api
      .createCard(cardData)
      .then((newCard) => {
        // Añadir propiedad isLiked
        const newCardWithLikeStatus = {
          ...newCard,
          isLiked: false, // Una nueva tarjeta nunca tendrá like del usuario al crearla
        };
        setCards([newCardWithLikeStatus, ...cards]);
        onClosePopup();
      })
      .catch((err) => console.error("Error al crear tarjeta:", err));
  }

  function handleCardDelete() {
    if (cardToDelete) {
      api
        .deleteCard(cardToDelete)
        .then(() => {
          // Filtrar la tarjeta eliminada del estado
          setCards(cards.filter((card) => card._id !== cardToDelete));
          onClosePopup();
        })
        .catch((err) => console.error("Error al eliminar tarjeta:", err));
    }
  }

  async function handleCardLike(card) {
    // Verifica si a esta tarjeta ya le has dado like
    const isLiked = card.isLiked;

    try {
      // Envía una solicitud a la API y obtiene los datos actualizados de la tarjeta
      const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked);

      // Asegurando de que la propiedad isLiked esté actualizada
      const newCard = {
        ...updatedCard,
        isLiked: !isLiked,
      };

      // Actualiza el estado de las tarjetas
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado del like:", error);
    }
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
          onClose={onClosePopup}
          title={popup.title}
          name={popup.name}
        >
          {popup.children}
        </Popup>
      )}

      {/* ImagePopup se maneja por separado */}
      <ImagePopup
        isOpen={selectedCard !== null}
        onClose={onClosePopup}
        card={selectedCard}
      />
    </main>
  );
}
