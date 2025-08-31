// src/components/Profile/Profile.jsx
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css"
function Profile({
  temperatureType,
  onCardClick,
  clothingItems,
  onAddClick,
  onDeleteClick,
  onOpenEditProfile,
  onLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar
          onEditProfile={onOpenEditProfile} // ✅ pass through
          onLogout={onLogout} // ✅ pass through
        />
      </div>

      <section className="profile__clothing-items">
        <ClothesSection
          temperatureType={temperatureType}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
          onDeleteClick={onDeleteClick}
          onCardLike={onCardLike} 
        />
      </section>
    </div>
  );
}

export default Profile;
