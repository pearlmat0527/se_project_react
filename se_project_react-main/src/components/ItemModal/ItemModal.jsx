import { useContext } from "react";
import "./ItemModal.css";
import CloseIcon from "../../assets/Modal_Preview_close.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (activeModal !== "preview" || !card) return null;

  // Normalize owner id whether it's a string or an object { _id: ... }
  const ownerId = typeof card.owner === "string" ? card.owner : card.owner?._id;
  const isOwn = Boolean(
    ownerId && currentUser?._id && ownerId === currentUser._id
  );

  const imgSrc = card.imageUrl || card.image;
  const name = card.name || "Untitled";

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

        <img src={imgSrc} alt={name} className="modal__image" />

        <div className="modal__info">
          <div className="modal__header">
            <h2 className="modal__caption">{name}</h2>

            {/* Only show delete if current user owns the item */}
            {isOwn && (
              <button
                type="button"
                className="modal__delete-button"
                onClick={() => onDeleteClick(card)}
                aria-label="Delete item"
              >
                Delete item
              </button>
            )}
          </div>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
