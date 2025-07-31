import avatar from "../../assets/User_pic_8.svg"; // ✅ Adjust the path based on your file structure
import "./Sidebar.css"; // ✅ Optional: if you have CSS for the sidebar

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar AvatarSidebar"
        src={avatar}
        alt="User Avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default Sidebar;
