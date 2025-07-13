import "./ModalWithForm.css";

function ModalWithForm({ title, buttonText, children, onClose, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" type="button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
