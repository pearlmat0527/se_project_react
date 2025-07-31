import React from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/User_pic_8.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const location = "New York"; // update if dynamic
  const userName = "Terrence Tegegne";

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header__left">
          <Link to="/">
            <img className="header__logo" src={logo} alt="App logo" />
          </Link>
          <p className="header__date_location">
            {currentDate}, {location}
          </p>
        </div>

        <div className="header__right">
          <ToggleSwitch />
          <button className="header__add-close-btn" onClick={onAddClick}>
            + Add clothes
          </button>

          <Link to="/profile" className="header__profile-link">
            <p className="header__username">{userName}</p>
            <img src={avatar} alt="User avatar" className="header__avatar" />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
