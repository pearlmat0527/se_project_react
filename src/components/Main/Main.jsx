import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/constants.js";

function Main({ weatherData, onCardClick }) {
  const temperature = weatherData?.temp?.F || "–"; 
  

  return (
    <>
      <WeatherCard temperature={temperature} />
      <section className="cards">
        <p className="cards__weather-text">
          Today is {temperature}°F / You may want to wear:
        </p>

        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              // Show all if weatherData.type is not yet set
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
    </>
  );
}

export default Main;
