import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState(""); // "" = no modal open

  const handleOpenModal = () => setActiveModal("Add garment");
  const handleCloseModal = () => setActiveModal("");

  return (
    <div className="page">
      <div className="page__content">
        {/* ✅ Pass correct handler to Header */}
        <Header onAddClick={handleOpenModal} />
        <Main weatherData={weatherData} />
      </div>

      {/* ✅ Only render modal when active */}
      {activeModal === "Add garment" && (
        <ModalWithForm
          title="New Garment"
          buttonText="Add garment"
          onClose={handleCloseModal}
          isOpen={activeModal === "Add garment"} // ✅ clean boolean logic
        >
          {/* ✅ Form content as children */}
          <label className="modal__label">
            Name
            <input type="text" className="modal__input" name="name" />
          </label>

          <label className="modal__label">
            Image
            <input type="url" className="modal__input" name="image" />
          </label>

          <fieldset className="modal__fieldset">
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
    </div>
  );
}

export default App;
