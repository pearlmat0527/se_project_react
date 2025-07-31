import Sidebar from "../Sidebar/Sidebar";
import ClothSection from "../ClothSection/ClothSection.jsx";

function Profile({ temperatureType, onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>
      <section className="profile__clothing-items">
        <ClothSection
          temperatureType={temperatureType}
          onCardClick={onCardClick}
          clothingItems={clothingItems} // ✅ Pass it here
        />
      </section>
    </div>
  );
}

export default Profile;
