import { useContext } from "react";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext"; 
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherData, onCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);

  const temperature = weatherData?.temp?.[currentTemperatureUnit] || "–";

  return (
    <section className="cards">
      <WeatherCard temperature={weatherData?.temp} />

      <p className="cards__weather-text">
        Today is {temperature}°{currentTemperatureUnit} / You may want to wear:
      </p>

      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            if (!weatherData?.type) return true;
            return item.weather === weatherData.type;
          })
          .map((item) => (
            <li key={item.id} className="cards__list-item">
              <ItemCard
                item={item}
                onClick={onCardClick}
                onCardLike={onCardLike}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default Main;
