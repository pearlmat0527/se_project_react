import "./ItemCard.css"
function ItemCard({ item }) {
  return (
    <div className="item-card">
      <p className="item-card__name">{item.name}</p>
      <img className="item-card__image" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
