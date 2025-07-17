import "./ItemModal.css";

function ItemModal({ activeModal, card, onClose }) {
  if (activeModal !== "preview" || !card) return null;

  return (
    <div className="modal modal_opened" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="modal__close"
          aria-label="Close preview modal"
        >
          ✕
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />

        {/* ✅ Grouped info */}
        <div className="modal__info">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
