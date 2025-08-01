import avatar from "../../assets/User_pic_8.svg"; // ✅ Adjust path if needed
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar" // ✅ Removed undefined class
        src={avatar}
        alt="User Avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default Sidebar;
