// src/components/App/App.jsx
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { apiKey, DEFAULT_COORDINATES } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { CurrentTempUnitProvider } from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  updateProfile,
  addCardLike, // ← NEW
  removeCardLike, // ← NEW
} from "../../utils/api";

// 🔐 auth client
import { signup, signin, getMe } from "../../utils/auth";

// 🔒 protected route
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// (optional) dedicated auth modals
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  // -------- weather --------
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 99, C: 90 },
    city: "",
  });
  const [weatherError, setWeatherError] = useState(false);

  // -------- ui/modals --------
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // -------- items --------
  const [clothingItems, setClothingItems] = useState([]);

  // -------- auth --------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // (optional) auth modals
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  // -------- edit profile modal (Task 3) --------
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isProfileSaving, setProfileSaving] = useState(false);
  const [profileApiError, setProfileApiError] = useState("");

  // -------- add-item form state --------
  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageError, setImageError] = useState("");

  // ===== Handlers =====
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

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

  const handleProfileUpdate = async ({ name, avatar }) => {
    try {
      setProfileSaving(true);
      setProfileApiError("");
      const updatedUser = await updateProfile({ name, avatar });
      setCurrentUser(updatedUser); // refresh context
      setEditProfileOpen(false); // close modal
    } catch (e) {
      setProfileApiError(e.message || "Profile update failed");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleCardLike = async ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return; // guests can't like

    try {
      const updatedCard = !isLiked
        ? await addCardLike(id)
        : await removeCardLike(id);

      setClothingItems((cards) =>
        cards.map((item) =>
          item._id === id || item.id === id ? updatedCard : item
        )
      );
    } catch (err) {
      console.error("[Like] failed:", err);
    }
  };

  // ===== Validate add-item form =====
  useEffect(() => {
    const isValid =
      formValues.name.trim() !== "" &&
      formValues.imageUrl.trim() !== "" &&
      imageError === "" &&
      formValues.weather !== "";
    setIsFormValid(isValid);
  }, [formValues, imageError]);

  // ===== Open/Close modals =====
  const handleOpenModal = () => setActiveModal("Add garment");
  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setFormValues({ name: "", imageUrl: "", weather: "" });
  };

  // ===== Card interactions =====
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
    if (!isLoggedIn || !localStorage.getItem("jwt")) {
      alert("Please sign in to delete items.");
      return;
    }

    try {
      await deleteClothingItem(selectedCard._id);
      const updatedItems = await getClothingItems(); // refetch
      setClothingItems(updatedItems);
    } catch (err) {
      console.error("[Delete] Failed:", err.message);
    }

    setSelectedCard(null);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedCard(null);
  };

  // ===== Weather on mount =====
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

  // ===== Items on mount (public GET) =====
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getClothingItems();
        setClothingItems(items);
      } catch (err) {
        console.error("[Clothing] Failed to load clothing items:", err);
      }
    };
    fetchItems();
  }, []);

  // ===== Add item (protected) =====
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (!isLoggedIn || !localStorage.getItem("jwt")) {
      alert("Please sign in to add items.");
      return;
    }

    try {
      const newItem = await addClothingItem(formValues);
      setClothingItems((prev) => [newItem, ...prev]);
      handleCloseModal();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // ===== Auth: token check on load =====
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getMe(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  // ===== Auth: register -> immediate sign-in =====
  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      const res = await signup({ name, avatar, email, password });

      // If backend returns a token on signup, use it; else sign in explicitly
      let token = res?.token;
      if (!token) {
        const login = await signin({ email, password });
        token = login?.token;
      }
      if (token) {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true);
        const me = await getMe(token);
        setCurrentUser(me);
      }
      setRegisterOpen(false);
    } catch (e) {
      alert(e.message || "Registration failed");
    }
  };

  // ===== Auth: login =====
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await signin({ email, password });
      if (res?.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        const me = await getMe(res.token);
        setCurrentUser(me);
        setLoginOpen(false);
      }
    } catch (e) {
      alert(e.message || "Login failed");
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTempUnitProvider>
        <div className="page">
          <div className="page__content">
            <Header
              onAddClick={handleOpenModal}
              onOpenRegister={() => setRegisterOpen(true)}
              onOpenLogin={() => setLoginOpen(true)}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              user={currentUser}
            />

            {/* Edit Profile Modal (Task 3) */}
            <EditProfileModal
              isOpen={isEditProfileOpen}
              onClose={() => setEditProfileOpen(false)}
              onSubmit={handleProfileUpdate}
              isLoading={isProfileSaving}
              apiError={profileApiError}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    weatherError={weatherError}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      temperatureType={weatherData.type}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleOpenModal}
                      onDeleteClick={handleDeleteClick}
                      onOpenEditProfile={() => setEditProfileOpen(true)}
                      onLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          {/* Preview modal */}
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={handleCloseModal}
            onDeleteClick={handleDeleteClick}
          />

          {/* Delete confirmation */}
          {showDeleteConfirm && (
            <DeleteConfirmationModal
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
            />
          )}
        </div>

        {/* Add item */}
        <AddItemModal
          isOpen={activeModal === "Add garment"}
          onCloseModal={handleCloseModal}
          onSubmit={handleAddItem}
          formValues={formValues}
          handleFormChange={handleFormChange}
          imageError={imageError}
        />

        {typeof RegisterModal === "function" && (
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setRegisterOpen(false)}
            onRegister={handleRegister}
          />
        )}
        {typeof LoginModal === "function" && (
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setLoginOpen(false)}
            onLogin={handleLogin}
          />
        )}
      </CurrentTempUnitProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
