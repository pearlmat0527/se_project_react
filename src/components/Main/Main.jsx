import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/constants.js";

function Main({ weatherData, onCardClick }) {
  const temperature = weatherData?.temp?.F || "–";

  return (
    <section className="cards">
      <WeatherCard temperature={temperature} />

      <p className="cards__weather-text">
        Today is {temperature}°F / You may want to wear:
      </p>

      <ul className="cards__list">
        {defaultClothingItems
          .filter((item) => {
            if (!weatherData?.type) return true;
            return item.weather === weatherData.type;
          })
          .map((item) => (
            <li key={item._id} className="cards__list-item">
              <ItemCard item={item} onClick={onCardClick} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Main;
