import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import WeatherCard from "./WeatherCard";
import Loader from "./Loader";
import "./SearchBox.css";

export default function SearchBox() {
  const API_KEY = "0c98cb990be710135b3dae4d842ee764";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [bgClass, setBgClass] = useState("normal");  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);                    

      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        alert("City not found");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData);
      // 3️⃣ Background logic
      const condition = weatherData.weather[0].main;
      const temp = weatherData.main.temp;

      if (condition === "Rain") {
        setBgClass("rainy");
      } else if ( 
        condition === "Fog" ||
        condition === "Mist" ||
        condition === "Haze" 
      ) {
        setBgClass("fog");
      } else if (condition === "Snow" || temp < 10) {
        setBgClass("winter");
      } else if (condition === "Clear" && temp > 30) {
        setBgClass("sunny");
      } else {
        setBgClass("normal");
      }

      setCity("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);                 
    }
  };

  return (
    <div className="search-container" style={{
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background 0.5s ease-in-out",
    backgroundImage:
      bgClass === "sunny"
        ? "url('/sunny.jpg')"
        : bgClass === "winter"
        ? "url('/winter.jpg')"
        : bgClass === "rainy"
        ? "url('/rainy.jpg')"
        : bgClass === "fog"
        ? "url('/fog.jpg')"
        : "linear-gradient(135deg, #74ebd5, #acb6e5)",
  }}>
      <h2>Weather App</h2>

      <form onSubmit={handleSubmit} className="search-form">
        <TextField
          label="City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)} required
        />

        <Button type="submit" variant="contained" endIcon={<SendIcon />} >
          Search
        </Button>
      </form>

      {/*  LOADER */}
      {loading && <Loader />}

      {/*  WEATHER RESULT */}
      {!loading && weather && <WeatherCard weather={weather} />}
    </div>
  );
}
