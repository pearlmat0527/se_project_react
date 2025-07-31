import React from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  isOpen,
  onCloseModal,
  onSubmit,
  formValues,
  handleFormChange,
  imageError,
}) => {
  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      onClose={onCloseModal}
      isOpen={isOpen}
      onSubmit={onSubmit}
    >
      <label className="form-modal__label">
        Name
        <input
          type="text"
          className="form-modal__input"
          name="name"
          value={formValues.name}
          onChange={handleFormChange}
        />
      </label>

      <label className="form-modal__label">
        Image
        <input
          type="url"
          className="form-modal__input"
          name="imageUrl"
          value={formValues.imageUrl}
          onChange={handleFormChange}
        />
        {imageError && <span className="form-modal__error">{imageError}</span>}
      </label>

      <fieldset className="form-modal__fieldset">
        <legend>Select the weather type:</legend>
        <label>
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={formValues.weather === "hot"}
            onChange={handleFormChange}
          />{" "}
          Hot
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={formValues.weather === "warm"}
            onChange={handleFormChange}
          />{" "}
          Warm
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={formValues.weather === "cold"}
            onChange={handleFormChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
