import "./ItemCard.css";

function ItemCard({ item, onClick }) {
  return (
    <div className="item-card" onClick={() => onClick(item)}>
      <p className="item-card__name">{item.name}</p>
      <img className="item-card__image" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
