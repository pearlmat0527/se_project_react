import "./ItemCard.css";

function ItemCard({ item, onClick }) {
  return (
    <div className="item-card" onClick={() => onClick(item)}>
      <p className="item-card__name">{item.name}</p>
      <img
        className="item-card__image"
        src={item.image || item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;
