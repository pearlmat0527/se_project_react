import { useContext, useMemo } from "react";
import "./ClothesSection.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems = [],
  onAddClick,
  onDeleteClick, // (kept for parity; used by cards if needed)
  
}) {
  const currentUser = useContext(CurrentUserContext);

  // Only show items added by the current user
  const myItems = useMemo(() => {
    if (!currentUser?._id) return [];
    return clothingItems.filter((item) => {
      const ownerId =
        typeof item.owner === "string" ? item.owner : item.owner?._id;
      return ownerId === currentUser._id;
    });
  }, [clothingItems, currentUser]);

  return (
    <section className="clothing-section">
      <div className="clothing-section__header">
        <p className="clothing-section__title">Your items</p>
        <button className="clothing-section__add-button" onClick={onAddClick}>
          + Add new
        </button>
      </div>

      {myItems.length === 0 ? (
        <p className="clothing-section__empty">
          You haven’t added any items yet.
        </p>
      ) : (
        <ul className="clothing-section__grid">
          {myItems.map((item) => (
            <li
              key={item._id || item.id}
              className="clothing-section__grid-item"
              onClick={() => onCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onCardClick(item)}
            >
              <div className="clothing-section__item">
                <p className="clothing-section__item-name">{item.name}</p>
                <img
                  src={item.imageUrl || item.image}
                  alt={item.name}
                  className="clothing-section__item-image"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ClothesSection;
