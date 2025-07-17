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
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [formValues, setFormValues] = useState({ name: "", image: "", weather: "" });
const [isFormValid, setIsFormValid] = useState(false);
const [imageError, setImageError] = useState("");

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormValues((prev) => ({ ...prev, [name]: value }));

  // Image validation
  if (name === "image") {
    try {
      new URL(value); // checks if valid URL
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
    getWeather(DEFAULT_COORDINATES, apiKey)
      .then((data) => {
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      })
      .catch((err) => {
        console.error("Weather fetch error:", err);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header onAddClick={handleOpenModal} />
        <Main weatherData={weatherData} onCardClick={handleCardClick} />
      </div>

      {activeModal === "Add garment" && (
        <ModalWithForm
          title="New Garment"
          buttonText="Add garment"
          onClose={handleCloseModal}
          isOpen={true}
        >
          <label className="form-modal__label">
            Name
            <input type="text" className="form-modal__input" name="name" />
          </label>

          <label className="form-modal__label">
            Image
            <input type="url" className="form-modal__input" name="image" />
          </label>

          <fieldset className="form-modal__fieldset">
            <legend>Select the weather type:</legend>
            <label>
              <input type="radio" name="weather" value="hot" /> Hot
            </label>
            <label>
              <input type="radio" name="weather" value="warm" /> Warm
            </label>
            <label>
              <input type="radio" name="weather" value="cold" /> Cold
            </label>
          </fieldset>
        </ModalWithForm>
      )}

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={handleCloseModal}
      />
      <Footer />
    </div>
  );
}

export default App;
