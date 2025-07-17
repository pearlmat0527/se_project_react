import sunny_morning from "../../assets/Sunny_Morning.png";
import "./WeatherCard.css";

function WeatherCard({ temperature }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temperature}°F</p>
      <img
        src={sunny_morning}
        alt="Sunny morning"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
