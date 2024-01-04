import "./WeatherCard.css";
import { useEffect, useState } from "react";
import AreaChart from "../WeatherChart/AreaChart";

const WeatherCard = ({ currentCityWeather }) => {
  let clear = "./images/clear.png";
  let clouds = "./images/clouds.png";
  let rain = "./images/rain.png";

  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  useEffect(() => {
    if (currentCityWeather) {
      const sunriseTimestamp = currentCityWeather.sys.sunrise;
      const sunsetTimestamp = currentCityWeather.sys.sunset;

      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      setSunrise(sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setSunset(sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [currentCityWeather])

  return (
    <div className="details">
      <div className="detail-one">
        <div className="temp-cont">
          <h1>{currentCityWeather.main.temp}°C</h1>
          <img
            src={
              currentCityWeather.weather[0].main === "Clear"
                ? clear
                : currentCityWeather.weather[0].main === "Clouds"
                  ? clouds
                  : rain
            }
            alt={currentCityWeather.weather[0].main}
          />
        </div>
        <h2 className="cityName">{currentCityWeather.name}</h2>
      </div>
      <div className="detail-three">
        <div>
          <h2>Pressure</h2>
          <span>{currentCityWeather.main.pressure} hpa</span>
        </div>
        <div>
          <h2>Humidity</h2>
          <span>{currentCityWeather.main.humidity}%</span>
        </div>
      </div>
      <div className="detail-three">
        <div>
          <h2>Sunrise</h2>
          <span>{sunrise}</span>
        </div>
        <div>
          <h2>Sunset</h2>
          <span>{sunset}</span>
        </div>
      </div>
      <div className="detail-four">
        <AreaChart sunrise={sunrise} sunset={sunset} />
      </div>
    </div>
  );
};

export default WeatherCard;
