import "./Home.css";
import axios from "axios";
import { City } from "country-state-city";
import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SkeletonLoader from "../Skeleton/SkeletonLoader";

const Home = ({ handleError }) => {
  const keys = ["name"];
  const myRef = useRef();
  const [city, setCity] = useState(localStorage.getItem("city") || "Delhi");
  const [query, setQuery] = useState("");
  const [showWeather, setShowWeather] = useState(false);
  const cities = City.getCitiesOfCountry("IN");
  const [currentCityWeather, setCurrentCityWeather] = useState({});

  const searchCityWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9102fcb602fc2c718391570e2dab5618&units=metric`
      );
      setCurrentCityWeather(response.data);
      setShowWeather(true);
      localStorage.setItem("city", city)
    } catch (error) {
      handleError(error);
      setShowWeather(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query.length) {
      setCity(query)
    }
  };

  useEffect(() => {
    setShowWeather(false);
    searchCityWeather();
  }, [city, searchCityWeather]);

  const search = (data) => {
    return data.filter((item) => keys.some((key) => item[key].includes(query)));
  };

  const onClick = () => {
    myRef.current.style.display = "none";
  };

  const handleFocus = () => {
    myRef.current.style.display = "block";
  };

  return (
    <div className="home">
      <div className="search">
        <LocationOnIcon className="location-icon" />
        <input
          type="text"
          value={query}
          onFocus={handleFocus}
          onKeyDown={handleKeyPress}
          placeholder="Search City"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="contained"
          className="submit-button"
          onClick={() => { if (query.length) setCity(query) }}
        >Submit
        </Button>
      </div>

      {search(cities)?.length > 0 && (
        <div className="autocomplete" ref={myRef}>
          {search(cities).map((item, index) => {
            return index < 5 ? (
              <div
                key={item.name}
                onClick={() => {
                  onClick();
                  setCity(item.name);
                }}
                className="autocompleteItems"
              >
                <span>{item.name}</span>
                <div>
                  <img src="./images/clouds.png" alt={item.name} />
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}

      {showWeather ? (
        <WeatherCard
          currentCityWeather={currentCityWeather}
        />
      ) : <SkeletonLoader />}
    </div>
  );
};

export default Home;
