import "./ClothSection.css";

function ClothSection({ temperatureType, onCardClick, clothingItems }) {
const filteredItems = (clothingItems || []).filter(
  (item) => item.weather === temperatureType
);

  return (
    <section className="clothing-section">
      <div className="clothing-section__header">
        <p className="clothing-section__title">Your items</p>
        <button className="clothing-section__add-button">+ Add new</button>
      </div>

      <ul className="clothing-section__grid">
        {filteredItems.map((item) => (
          <li
            key={item.id || item._id}
            className="clothing-section__grid-item"
            onClick={() => onCardClick(item)} // ✅ Now this will work
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

export default ClothSection;
