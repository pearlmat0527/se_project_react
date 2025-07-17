export const getWeather = async ({ latitude, longitude }, apiKey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("getWeather error:", err);
    throw err;
  }
};

// Filter + classify temperature
export const filterWeatherData = (data) => {
  const tempF = data.main.temp;
  const tempC = ((tempF - 32) * 5) / 9;

  let type;
  if (tempF >= 86) {
    type = "hot";
  } else if (tempF >= 66) {
    type = "warm";
  } else {
    type = "cold";
  }

  return {
    type,
    temp: {
      F: Math.round(tempF),
      C: Math.round(tempC),
    },
    city: data.name,
  };
};
