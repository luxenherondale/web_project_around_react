// EditProfileForm.jsx - Componente para el formulario de editar perfil
import React, { useState } from "react";

export default function EditProfileForm({
  onSubmit,
  userData,
  closeButton,
  popupTitle,
}) {
  const [name, setName] = useState(userData?.name || "");
  const [about, setAbout] = useState(userData?.about || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, about });
  };

  return (
    <form className="profile__form-edit form" onSubmit={handleSubmit}>
      {closeButton}
      {popupTitle}
      <fieldset className="form__fieldset fieldset">
        <label className="form__label" htmlFor="name"></label>
        <input
          className="form__input"
          type="text"
          id="name"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span id="name-error" className="forminput-error"></span>

        <label className="form__label" htmlFor="job"></label>
        <input
          className="form__input"
          type="text"
          id="job"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="200"
          required
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <span id="job-error" className="forminput-error"></span>

        <button className="buttonsave" type="submit" id="buttonsave">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
