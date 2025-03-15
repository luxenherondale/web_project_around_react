// EditAvatarForm.jsx - Componente para el formulario de editar avatar
import React, { useState } from "react";

export default function EditAvatarForm({ onSubmit, closeButton, popupTitle }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ avatar: avatarUrl });
  };

  return (
    <form className="avatar__form-edit form" onSubmit={handleSubmit}>
      {closeButton}
      {popupTitle}
      <fieldset className="form__fieldset fieldset">
        <label className="form__label" htmlFor="avatar-url"></label>
        <input
          className="form__input"
          type="url"
          id="avatar-url"
          placeholder="Enlace a la nueva foto de perfil"
          required
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <span id="avatar-url-error" className="forminput-error"></span>

        <button className="buttonsave" type="submit" id="avatarbuttonsave">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
