import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import { apiKey, DEFAULT_COORDINATES } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi.js";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99, C: 90 },
    city: "",
  });
  const [weatherError, setWeatherError] = useState(false);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [formValues, setFormValues] = useState({
    name: "",
    image: "",
    weather: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageError, setImageError] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "image") {
      try {
        new URL(value);
        setImageError("");
      } catch {
        setImageError("This is not a valid image link.");
      }
    }
  };

  useEffect(() => {
    const isValid =
      formValues.name.trim() !== "" &&
      formValues.image.trim() !== "" &&
      imageError === "" &&
      formValues.weather !== "";
    setIsFormValid(isValid);
  }, [formValues, imageError]);

  const handleOpenModal = () => setActiveModal("Add garment");
  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(DEFAULT_COORDINATES, apiKey);
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setWeatherError(true);

        // Optional fallback data
        setWeatherData({
          type: "warm",
          temp: { F: 72, C: 22 },
          city: "Unavailable",
        });
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header onAddClick={handleOpenModal} />
        <Main
          weatherData={weatherData}
          onCardClick={handleCardClick}
          weatherError={weatherError}
        />
        <Footer />
      </div>

      <ModalWithForm
        title="New Garment"
        buttonText="Add garment"
        onClose={handleCloseModal}
        isOpen={activeModal === "Add garment"}
      >
        <label className="form-modal__label">
          Name
          <input
            type="text"
            className="form-modal__input"
            name="name"
            value={formValues.name}
            onChange={handleFormChange}
          />
        </label>

        <label className="form-modal__label">
          Image
          <input
            type="url"
            className="form-modal__input"
            name="image"
            value={formValues.image}
            onChange={handleFormChange}
          />
          {imageError && (
            <span className="form-modal__error">{imageError}</span>
          )}
        </label>

        <fieldset className="form-modal__fieldset">
          <legend>Select the weather type:</legend>
          <label>
            <input
              type="radio"
              name="weather"
              value="hot"
              checked={formValues.weather === "hot"}
              onChange={handleFormChange}
            />{" "}
            Hot
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={formValues.weather === "warm"}
              onChange={handleFormChange}
            />{" "}
            Warm
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={formValues.weather === "cold"}
              onChange={handleFormChange}
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
