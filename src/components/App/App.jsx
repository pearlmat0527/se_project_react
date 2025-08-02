import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { apiKey, DEFAULT_COORDINATES } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { CurrentTempUnitProvider } from "../contexts/CurrentTempUnitContext";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99, C: 90 },
    city: "",
  });
  const [weatherError, setWeatherError] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageError, setImageError] = useState("");

  // Form change handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "imageUrl") {
      try {
        new URL(value);
        setImageError("");
      } catch {
        setImageError("This is not a valid image link.");
      }
    }
  };

  // Validate form
  useEffect(() => {
    const isValid =
      formValues.name.trim() !== "" &&
      formValues.imageUrl.trim() !== "" &&
      imageError === "" &&
      formValues.weather !== "";
    setIsFormValid(isValid);
  }, [formValues, imageError]);

  // Open modal
  const handleOpenModal = () => setActiveModal("Add garment");
  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setFormValues({ name: "", imageUrl: "", weather: "" });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    setShowDeleteConfirm(true);
    setActiveModal("");
  };
  const handleConfirmDelete = async () => {
    if (!selectedCard?._id) return;

    try {
      await deleteClothingItem(selectedCard._id); // ✅ works
      const updatedItems = await getClothingItems(); // ✅ refetch
      setClothingItems(updatedItems); // ✅ triggers re-render
    } catch (err) {
      console.error("[Delete] Failed:", err.message);
    }

    setSelectedCard(null);
    setShowDeleteConfirm(false);
  };

  // Load weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(DEFAULT_COORDINATES, apiKey);
        const filtered = filterWeatherData(data);
        setWeatherData(filtered);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setWeatherError(true);
        setWeatherData({
          type: "warm",
          temp: { F: 72, C: 22 },
          city: "Unavailable",
        });
      }
    };
    fetchWeather();
  }, []);

  // Load clothing items
  useEffect(() => {
    const fetchItems = async () => {
      console.log("[Clothing] Fetching items...");
      try {
        const items = await getClothingItems();
        console.log("[Clothing] Fetched items:", items);
        setClothingItems(items);
      } catch (err) {
        console.error("[Clothing] Failed to load clothing items:", err);
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const newItem = await addClothingItem(formValues);
      setClothingItems((prev) => [...prev, newItem]);
      handleCloseModal();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedCard(null);
  };

  return (
    <CurrentTempUnitProvider>
      <div className="page">
        <div className="page__content">
          <Header onAddClick={handleOpenModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  weatherError={weatherError}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  temperatureType={weatherData.type}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems.filter(
                    (item) => item.weather === weatherData.type
                  )}
                  onAddClick={handleOpenModal}
                  onDeleteClick={handleDeleteClick} 
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={handleCloseModal}
          onDeleteClick={handleDeleteClick} // ✅ directly pass the function
        />

        {showDeleteConfirm && (
          <DeleteConfirmationModal
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
      <AddItemModal
        isOpen={activeModal === "Add garment"}
        onCloseModal={handleCloseModal}
        onSubmit={handleAddItem}
        formValues={formValues}
        handleFormChange={handleFormChange}
        imageError={imageError}
      />
    </CurrentTempUnitProvider>
  );
}

export default App;
