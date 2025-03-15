// Card.jsx - Componente para renderizar cada tarjeta individual
import React from "react";

export default function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  currentUserId,
}) {
  // Extraer propiedades de la tarjeta
  const { name, link, likes, owner, _id } = card;

  // Verificar si la tarjeta está marcada como "me gusta" por el usuario actual
  const isLiked =
    likes &&
    Array.isArray(likes) &&
    likes.some((like) => like && like._id === currentUserId);

  // Verificar si el usuario actual es el propietario de la tarjeta
  const isOwner = owner && currentUserId === owner._id;

  // Manejadores de eventos
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(_id);
  };

  return (
    <div className="card__content">
      <img
        src={link || ""}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      {/* Movemos el botón de eliminar aquí para que aparezca sobre la imagen */}
      {isOwner && (
        <button
          className="button__delete"
          onClick={handleDeleteClick}
          type="button"
        ></button>
      )}
      <div className="card_info">
        <h2 className="card__text">{name}</h2>
        <button
          className={`button__like ${isLiked ? "button__like_active" : ""}`}
          onClick={handleLikeClick}
          type="button"
        ></button>
      </div>
    </div>
  );
}
