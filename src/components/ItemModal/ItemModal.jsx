import "./ItemModal.css";
import CloseIcon from "../../assets/Modal_Preview_close.svg"; // adjust path if needed

function ItemModal({ activeModal, card, onClose, onDeleteClick }) {
  if (activeModal !== "preview" || !card) return null;

  return (
    <div className="modal modal_opened" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="modal__close"
          aria-label="Close preview modal"
        >
          <img src={CloseIcon} alt="Close" className="modal__close-icon" />
        </button>

        <img
          src={card.image || card.imageUrl}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__info">
          <div className="modal__header">
            <h2 className="modal__caption">{card.name}</h2>
            <h2
              className="modal__delete-button"
              onClick={() => onDeleteClick(card)} // ✅ Pass the actual card being shown
            >
              Delete item
            </h2>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
