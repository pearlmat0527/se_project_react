import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  const temperature = 75; // or receive it as a prop

  return (
    <>
      <WeatherCard />
      <section className="Cards">
        <p className="cards__text">Today is {temperature}°</p>
        {/* TO DO: ADD the cards */}
      </section>
    </>
  );
}

export default Main;
