import { useContext } from "react";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext"; // ✅ Fix the import path as needed
import sunny_morning from "../../assets/Sunny_Morning.png";
import "./WeatherCard.css";

function WeatherCard({ temperature }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext); // ✅ Get unit from context

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temperature[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img
        src={sunny_morning}
        alt="Sunny morning"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
