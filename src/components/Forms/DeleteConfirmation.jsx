// DeleteConfirmation.jsx - Componente para confirmar eliminación de tarjeta
import React from "react";

export default function DeleteConfirmation({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="card__form-delete form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset fieldset">
        <button
          className="buttonsave popup__confirm-button"
          type="submit"
          id="confirm-delete"
        >
          Sí
        </button>
      </fieldset>
    </form>
  );
}
