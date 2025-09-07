// src/components/ModalWithForm/ModalWithForm.jsx
import "./ModalWithForm.css";
import CloseIcon from "../../assets/close_icon.svg";

function ModalWithForm({
  title,
  buttonText = "Submit",
  children,
  onClose,
  isOpen = false,
  onSubmit,

  // NEW: BEM-friendly hooks + disabled support
  isSubmitDisabled = false,
  modalClassName = "", // extra classes for overlay (e.g., "form-modal--register")
  contentClassName = "", // extra classes for card (e.g., "form-modal__content--register")
  submitButtonClassName = "", // optional extra class for submit (e.g., "register-modal__submit")
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`form-modal form-modal--opened ${modalClassName}`.trim()}
      onClick={onClose}
    >
      <div
        className={`form-modal__content ${contentClassName}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-modal__header">
          <h2 className="form-modal__title">{title}</h2>
          <button
            className="form-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <img
              src={CloseIcon}
              alt="Close dialog button"
              className="form-modal__close-icon"
              aria-hidden="true"
            />
          </button>
        </div>

        <form className="form-modal__form" onSubmit={handleSubmit} noValidate>
          {children}
          <button
            type="submit"
            className={`form-modal__submit-button ${submitButtonClassName}`.trim()}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
  