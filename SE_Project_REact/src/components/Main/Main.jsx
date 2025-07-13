import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { defaultClothingItems } from "../../utils/constants.js";

function Main({ weatherData }) {
  const temperature = 75;

  return (
    <>
      <WeatherCard temperature={temperature} />
      <section className="cards">
        <p className="cards__weather-text">
          Today is {temperature}°F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <li key={item._id} className="cards__list-item">
                <ItemCard item={item} />
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
