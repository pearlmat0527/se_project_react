import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({
  onCardClick,
  clothingItems = [],
  onAddClick,
  onCardLike, // ← make sure this is here
}) {
  const currentUser = useContext(CurrentUserContext);

  // show only current user's items (keep your logic)
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
            >
              <ItemCard
                item={item}
                onClick={onCardClick}
                onCardLike={onCardLike} // ← this enables the heart
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
