import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";



import HEART_DEFAULT from "../../assets/State_Default.svg";
import HEART_LIKED   from "../../assets/State_Liked.svg";

function ItemCard({ item, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Normalize likes -> array of userIds
  const likeIds = Array.isArray(item.likes)
    ? item.likes
        .map((l) => (typeof l === "string" ? l : l?._id))
        .filter(Boolean)
    : [];

  const isLiked = useMemo(
    () => !!currentUser?._id && likeIds.includes(currentUser._id),
    [currentUser, likeIds]
  );

  const canLike = !!currentUser?._id;

  const handleLike = (e) => {
    e.stopPropagation(); // don’t open preview
    if (!canLike || !onCardLike) return;
    onCardLike({ id: item._id || item.id, isLiked });
  };

  return (
    <div className="item-card" onClick={() => onClick(item)}>
      {/* Top bar = name + like grouped together */}
      <div className="item-card__top">
        <p className="item-card__name">{item.name}</p>

        {canLike && (
          <button
            type="button"
            className={`item-card__like ${
              isLiked ? "item-card__like--active" : ""
            }`}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Unlike" : "Like"}
            onClick={handleLike}
          >
            <img
              className="item-card__like-icon" 
              src={isLiked ? HEART_LIKED : HEART_DEFAULT}
              alt="Liked image"
            />
          </button>
        )}
      </div>

      <img
        className="item-card__image"
        src={item.image || item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
