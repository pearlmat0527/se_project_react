// src/components/Sidebar/Sidebar.jsx
import { useContext, useMemo, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Sidebar.css";

function Sidebar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [imgOk, setImgOk] = useState(true);

  const { name, avatar, initials } = useMemo(() => {
    const n = (currentUser?.name || "Guest").trim();
    const a = (currentUser?.avatar || "").trim();
    const i = (n[0] || "G").toUpperCase();
    return { name: n, avatar: a, initials: i };
  }, [currentUser]);

  return (
    <aside className="sidebar" aria-label="Profile sidebar">
      {/* NEW: identity row (avatar + name) */}
      <div className="sidebar__identity">
        {avatar && imgOk ? (
          <img
            className="sidebar__avatar"
            src={avatar}
            alt={`${name} — profile avatar`}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div
            className="sidebar__avatar sidebar__avatar--placeholder"
            aria-hidden="true"
          >
            {initials}
          </div>
        )}

        <p className="sidebar__username" title={name}>
          {name}
        </p>
      </div>

      {/* Actions sit UNDER the name, aligned with it */}
      <nav className="sidebar__actions" aria-label="Profile actions">
        <button type="button" className="sidebar__link" onClick={onEditProfile}>
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__link sidebar__link--danger"
          onClick={onLogout}
        >
          Log out
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
