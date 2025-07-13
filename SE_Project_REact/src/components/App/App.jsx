import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "" });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
