import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/Close_button_1.svg"; // ✅ Adjust path if needed

function DeleteConfirmationModal({ onCancel, onConfirm }) {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__content">
        <button
          className="confirm-modal__close"
          onClick={onCancel}
          aria-label="Close delete confirmation"
        >
          <img src={closeIcon} alt="Close_icon" />
        </button>

        <p className="confirm-modal__text">
          Are you sure you want to delete this item? <br />
          This action is irreversible.
        </p>

        <div className="confirm-modal__actions">
          <button
            className="confirm-modal__delete"
            onClick={() => {
              console.log("[Modal] Confirm delete clicked");
              onConfirm();
            }}
          >
            Yes, delete item
          </button>
          <button className="confirm-modal__cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
