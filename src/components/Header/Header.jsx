import React from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/User_pic_8.svg";

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
          <img className="header__logo" src={logo} alt="App logo" />
          <p className="header__date_location">
            {currentDate}, {location}
          </p>
        </div>

        <div className="header__right">
          <button className="header__add-close-btn" onClick={onAddClick}>
            + Add clothes
          </button>
          <p className="header__username">{userName}</p>
          <img src={avatar} alt="User avatar" className="header__avatar" />
        </div>
      </header>
    </div>
  );
}

export default Header;
