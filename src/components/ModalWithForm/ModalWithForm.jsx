import "./ModalWithForm.css";

function ModalWithForm({ title, buttonText, children, onClose, isOpen }) {
  return (
    <div className={`form-modal ${isOpen ? "form-modal--opened" : ""}`}>
      <div className="form-modal__content">
        <div className="form-modal__header">
          <h2 className="form-modal__title">{title}</h2>
          <button className="form-modal__close" type="button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="form-modal__form">
          {children}
          <button type="submit" className="form-modal__submit-button">
              {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
