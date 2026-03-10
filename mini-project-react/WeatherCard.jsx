import "./WeatherCard.css";

export default function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h3>{weather.name}</h3>

      <p>🌡 Temperature: {weather.main.temp} °C</p>
      <p>☁ Weather: {weather.weather[0].description}</p>
      <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}
