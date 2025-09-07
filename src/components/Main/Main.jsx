import { useContext, useMemo } from "react";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherData, onCardClick, clothingItems = [], onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);
  const temperature = weatherData?.temp?.[currentTemperatureUnit] ?? "–";

  const filteredItems = useMemo(
    () =>
      clothingItems.filter(
        (item) => !weatherData?.type || item.weather === weatherData.type
      ),
    [clothingItems, weatherData?.type]
  );

  return (
    <section className="cards">
      <WeatherCard temperature={weatherData?.temp} />

      <p className="cards__weather-text">
        Today is {temperature}°{currentTemperatureUnit} / You may want to wear:
      </p>

      {filteredItems.length === 0 ? (
        <p className="cards__empty">No items match the current weather.</p>
      ) : (
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <li key={item._id || item.id} className="cards__list-item">
              <ItemCard
                item={item}
                onClick={onCardClick}
                onCardLike={onCardLike}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Main;
