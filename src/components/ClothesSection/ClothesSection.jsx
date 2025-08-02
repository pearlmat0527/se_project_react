import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClick,
  onDeleteClick,
  
}) {
  return (
    <section className="clothing-section">
      <div className="clothing-section__header">
        <p className="clothing-section__title">Your items</p>
        <button className="clothing-section__add-button" onClick={onAddClick}>
          + Add new
        </button>
      </div>

      <ul className="clothing-section__grid">
        {(clothingItems || []).map((item) => (
          <li
            key={item._id || item.id}
            className="clothing-section__grid-item"
            onClick={() => onCardClick(item)}
          >
            <div className="clothing-section__item">
              <p className="clothing-section__item-name">{item.name}</p>
              <img
                src={item.image || item.imageUrl}
                alt={item.name}
                className="clothing-section__item-image"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
