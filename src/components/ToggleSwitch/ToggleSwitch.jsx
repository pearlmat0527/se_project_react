import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );

  const isFahrenheit = currentTemperatureUnit === "F";

  return (
    <div className="toggle-switch" onClick={handleToggleSwitchChange}>
      <div
        className={`toggle-switch__circle ${isFahrenheit ? "left" : "right"}`}
      ></div>
      <div className="toggle-switch__text">
        <span
          className={`toggle-switch__text_F ${isFahrenheit ? "active" : ""}`}
        >
          F
        </span>
        <span
          className={`toggle-switch__text_C ${!isFahrenheit ? "active" : ""}`}
        >
          C
        </span>
      </div>
    </div>
  );
}
