// EditAvatarForm.jsx - Componente para el formulario de editar avatar
import React, { useState } from "react";

export default function EditProfileForm({ onSubmit }) {
  const [ProfileUrl, setProfileUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ Profile: ProfileUrl });
  };

  return (
    <form className="profile__form-edit form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset fieldset">
        <label className="form__label" htmlFor="avatar-url"></label>
        <input
          className="form__input"
          type="url"
          id="Profile-url"
          placeholder="Enlace a la nueva foto de perfil"
          required
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <span id="Profile-url-error" className="forminput-error"></span>

        <button className="buttonsave" type="submit" id="avatarbuttonsave">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
