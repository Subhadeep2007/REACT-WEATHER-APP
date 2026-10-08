import { useState } from "react";

import SearchBar from "../components/SearchBar";
import WeatherHero from "../components/WeatherHero";
import WeatherStats from "../components/WeatherStats";
import Forecast from "../components/Forecast";
import WeatherGraph from "../components/WeatherGraph";
import WeatherMap from "../components/WeatherMap";
import Directions from "../components/Directions";
import Loader from "../components/Loader";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function Home() {
  const [city, setCity] = useState("");

  const [weather, setWeather] = useState(null);

  const [forecast, setForecast] = useState([]);

  const [graphData, setGraphData] = useState([]);

  const [userLocation, setUserLocation] = useState(null);

  const [userLocationName, setUserLocationName] =
    useState("Your Current Location");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ==================================================
  // FETCH WEATHER USING LATITUDE + LONGITUDE
  // ==================================================
  const fetchWeatherByCoordinates = async (
    lat,
    lon,
    locationName = ""
  ) => {
    // ------------------------------------------
    // CURRENT WEATHER
    // ------------------------------------------
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!weatherResponse.ok) {
      throw new Error("Weather data failed.");
    }

    const weatherData = await weatherResponse.json();

    // ------------------------------------------
    // FORECAST
    // ------------------------------------------
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!forecastResponse.ok) {
      throw new Error("Forecast data failed.");
    }

    const forecastData = await forecastResponse.json();

    // ------------------------------------------
    // WEATHER STATE
    // ------------------------------------------
    setWeather({
      city: weatherData.name,

      country: weatherData.sys.country,

      temp: Math.round(weatherData.main.temp),

      feelsLike: Math.round(
        weatherData.main.feels_like
      ),

      condition: weatherData.weather[0].main,

      description: weatherData.weather[0].description,

      icon: weatherData.weather[0].icon,

      humidity: weatherData.main.humidity,

      wind: Math.round(
        weatherData.wind.speed * 3.6
      ),

      visibility: weatherData.visibility
        ? (weatherData.visibility / 1000).toFixed(1)
        : "--",

      pressure: weatherData.main.pressure,

      sunrise: new Date(
        weatherData.sys.sunrise * 1000
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      sunset: new Date(
        weatherData.sys.sunset * 1000
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      // Destination coordinates
      lat: weatherData.coord.lat,

      lon: weatherData.coord.lon,
    });

    // ------------------------------------------
    // DAILY FORECAST
    // ------------------------------------------
    const dailyForecast = forecastData.list
      .filter((item) =>
        item.dt_txt.includes("12:00:00")
      )
      .slice(0, 5)
      .map((item) => ({
        day: new Date(
          item.dt * 1000
        ).toLocaleDateString("en-US", {
          weekday: "short",
        }),

        icon: item.weather[0].icon,

        temp: Math.round(item.main.temp),

        min: Math.round(item.main.temp_min),

        condition: item.weather[0].main,
      }));

    setForecast(dailyForecast);

    // ------------------------------------------
    // GRAPH DATA
    // ------------------------------------------
    const graph = forecastData.list
      .slice(0, 8)
      .map((item) => ({
        time: new Date(
          item.dt * 1000
        ).toLocaleTimeString([], {
          hour: "numeric",
        }),

        temp: Math.round(item.main.temp),

        feelsLike: Math.round(
          item.main.feels_like
        ),
      }));

    setGraphData(graph);

    // Optional name for UI
    if (locationName) {
      setUserLocationName(locationName);
    }
  };

  // ==================================================
  // SEARCH CITY
  // ==================================================
  const handleSearch = async (e) => {
    e.preventDefault();

    const searchCity = city.trim();

    if (!searchCity) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ------------------------------------------
      // GEOCODING
      // ------------------------------------------
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          searchCity
        )}&limit=1&appid=${API_KEY}`
      );

      if (!geoResponse.ok) {
        throw new Error(
          "Location service failed."
        );
      }

      const geoData = await geoResponse.json();

      if (!geoData.length) {
        throw new Error("City not found.");
      }

      const location = geoData[0];

      const lat = location.lat;

      const lon = location.lon;

      // ------------------------------------------
      // FETCH WEATHER
      // ------------------------------------------
      await fetchWeatherByCoordinates(
        lat,
        lon
      );

      // Search field clear
      setCity("");

    } catch (err) {
      console.error(err);

      setError(
        err.message || "Something went wrong."
      );

      setWeather(null);
      setForecast([]);
      setGraphData([]);

    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // LOCATE ME
  // ==================================================
  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat =
            position.coords.latitude;

          const lon =
            position.coords.longitude;

          // --------------------------------------
          // SAVE CURRENT LOCATION
          // --------------------------------------
          setUserLocation({
            lat,
            lon,
          });

          // --------------------------------------
          // REVERSE GEOCODING
          // --------------------------------------
          const reverseResponse =
            await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
            );

          const reverseData =
            await reverseResponse.json();

          const currentPlace =
            reverseData?.[0]?.name ||
            "Your Current Location";

          setUserLocationName(
            currentPlace
          );

          // --------------------------------------
          // GET CURRENT LOCATION WEATHER
          // --------------------------------------
          await fetchWeatherByCoordinates(
            lat,
            lon,
            currentPlace
          );

        } catch (err) {
          console.error(err);

          setError(
            err.message ||
              "Unable to get your location weather."
          );
        } finally {
          setLoading(false);
        }
      },

      (geoError) => {
        console.error(geoError);

        setLoading(false);

        if (
          geoError.code ===
          geoError.PERMISSION_DENIED
        ) {
          setError(
            "Location permission denied. Please allow location access in your browser."
          );
        } else if (
          geoError.code ===
          geoError.POSITION_UNAVAILABLE
        ) {
          setError(
            "Your current location is unavailable."
          );
        } else {
          setError(
            "Unable to detect your location."
          );
        }
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 0,
      }
    );
  };

  // ==================================================
  // GOOGLE MAPS NAVIGATION
  // ==================================================
  const handleDirections = () => {
    if (!weather?.lat || !weather?.lon) {
      setError(
        "Destination location is not available."
      );

      return;
    }

    const destination =
      `${weather.lat},${weather.lon}`;

    // ------------------------------------------
    // WE ALREADY HAVE CURRENT LOCATION
    // ------------------------------------------
    if (userLocation) {
      const origin =
        `${userLocation.lat},${userLocation.lon}`;

      const googleMapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&origin=${encodeURIComponent(origin)}` +
        `&destination=${encodeURIComponent(destination)}` +
        `&travelmode=driving` +
        `&dir_action=navigate`;

      window.location.assign(
        googleMapsUrl
      );

      return;
    }

    // ------------------------------------------
    // GET LOCATION IF NOT AVAILABLE
    // ------------------------------------------
    if (!navigator.geolocation) {
      const googleMapsUrl =
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${encodeURIComponent(destination)}` +
        `&travelmode=driving` +
        `&dir_action=navigate`;

      window.location.assign(
        googleMapsUrl
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin =
          `${position.coords.latitude},${position.coords.longitude}`;

        const googleMapsUrl =
          `https://www.google.com/maps/dir/?api=1` +
          `&origin=${encodeURIComponent(origin)}` +
          `&destination=${encodeURIComponent(destination)}` +
          `&travelmode=driving` +
          `&dir_action=navigate`;

        // Same tab navigation
        window.location.assign(
          googleMapsUrl
        );
      },

      () => {
        const googleMapsUrl =
          `https://www.google.com/maps/dir/?api=1` +
          `&destination=${encodeURIComponent(destination)}` +
          `&travelmode=driving` +
          `&dir_action=navigate`;

        window.location.assign(
          googleMapsUrl
        );
      },

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 0,
      }
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* HEADER */}
        <header className="mb-8">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
            LIVE WEATHER
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Weather
            <span className="text-cyan-400">
              Now
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Search any city or use your current location.
          </p>
        </header>

        {/* SEARCH */}
        <SearchBar
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
          onLocate={handleLocate}
        />

        {/* ERROR */}
        {error && (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* LOADER */}
        {loading && (
          <div className="mt-8">
            <Loader />
          </div>
        )}

        {/* DATA */}
        {!loading && weather && (
          <>
            {/* WEATHER + MAP */}
            <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">

              <div className="space-y-5 lg:col-span-7">
                <WeatherHero
                  weather={weather}
                />

                <WeatherStats
                  weather={weather}
                />
              </div>

              <div className="lg:col-span-5">
                <WeatherMap
                  lat={weather.lat}
                  lon={weather.lon}
                  city={weather.city}
                  userLocation={userLocation}
                  userLocationName={
                    userLocationName
                  }
                  onDirections={
                    handleDirections
                  }
                />
              </div>

            </section>

            {/* FORECAST */}
            <section className="mt-5">
              <Forecast
                forecast={forecast}
              />
            </section>

            {/* GRAPH + DIRECTIONS */}
            <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">

              <div className="lg:col-span-8">
                <WeatherGraph
                  data={graphData}
                />
              </div>

              <div className="lg:col-span-4">
                <Directions
                  city={weather.city}
                  country={weather.country}
                  userLocationName={
                    userLocationName
                  }
                  onDirections={
                    handleDirections
                  }
                />
              </div>

            </section>
          </>
        )}

        {/* EMPTY */}
        {!loading &&
          !weather &&
          !error && (
            <div className="mt-10 flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
              <div>

                <div className="text-6xl">
                  🌍
                </div>

                <h2 className="mt-5 text-2xl font-bold">
                  Search for a city
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Search a city or use Locate Me
                  to get live weather information.
                </p>

              </div>
            </div>
          )}

        {/* FOOTER */}
        <footer className="py-8 text-center text-sm text-slate-600">
          WeatherNow • React • Tailwind • OpenWeather • Leaflet
        </footer>

      </div>
    </main>
  );
}