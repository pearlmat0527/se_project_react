import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({
  onAddClick,
  isLoggedIn = false,
  onOpenLogin,

  onOpenRegister,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = "New York";

  const userName = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar?.trim?.() || "";
  const initials = (userName || "G").trim()[0]?.toUpperCase?.() || "G";
  const hasAvatar = Boolean(avatar);

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header__left">
          <Link to="/" className="header__logo-link" aria-label="Home">
            <img className="header__logo" src={logo} alt="WTWR logo" />
          </Link>
          <p className="header__date_location">
            {currentDate}, {location}
          </p>
        </div>

        <div className="header__right">
          <ToggleSwitch />

          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="header__add-close-btn"
                onClick={onAddClick}
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__profile-link">
                <p className="header__username" title={userName}>
                  {userName}
                </p>
                {hasAvatar ? (
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="header__avatar"
                  />
                ) : (
                  <div
                    className="header__avatar header__avatar--placeholder"
                    aria-label={`Avatar for ${userName}`}
                  >
                    {initials}
                  </div>
                )}
              </Link>

              {/* Log out as text link */}
              <a
                href="#"
                className="header__auth-link header__auth-link_type_text"
                onClick={(e) => {
                  e.preventDefault();
                  onLogout?.();
                }}
                aria-label="Log out"
              >
                Log out
              </a>
            </>
          ) : (
            <nav className="header__auth" aria-label="Authentication">
              <a
                href="#"
                className="header__auth-link header__auth-link_type_text"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenRegister?.();
                }}
              >
                Sign Up
              </a>
              <a
                href="#"
                className="header__auth-link header__auth-link_type_text"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLogin?.();
                }}
              >
                Log In
              </a>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
