// Card.jsx - Componente para renderizar cada tarjeta individual
import React from "react";
import trashIcon from "../../images/Trash.png";

export default function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  currentUserId,
}) {
  // Extraer propiedades de la tarjeta
  const { name, link, likes, owner, _id, isLiked } = card;

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

  console.log(isLiked);

  return (
    <div className="card__content" data-id={_id}>
      <img
        src={link || ""}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      <button
        className="button__delete"
        onClick={handleDeleteClick}
        type="button"
      ></button>

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
