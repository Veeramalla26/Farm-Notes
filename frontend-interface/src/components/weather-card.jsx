import React from "react";
import { Card } from "react-bootstrap";
import "./weather-report.scss";
import {
  FaCloudSun,
  FaCloud,
  FaSun,
  FaCloudRain,
  FaBolt,
  FaSnowflake,
  FaSmog,
  FaCloudShowersHeavy,
  FaCloudSunRain,
} from "react-icons/fa";

const WeatherCard = ({ weather }) => {
  const { dt_txt, main, weather: weatherDetails, wind } = weather;
  const { temp, feels_like, pressure, humidity } = main;
  const weatherInfo = weatherDetails[0];

  const formattedDate = new Date(dt_txt).toLocaleDateString();
  const formattedTime = new Date(dt_txt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const getWeatherIcon = (description) => {
    switch (description) {
      case "clear sky":
        return <FaSun style={{ color: "#FFD700" }} />;
      case "few clouds":
        return <FaCloudSun style={{ color: "#F0E68C" }} />;
      case "scattered clouds":
        return <FaCloud style={{ color: "#B0C4DE" }} />;
      case "broken clouds":
        return <FaCloudShowersHeavy style={{ color: "#A9A9A9" }} />;
      case "overcast clouds":
        return <FaCloud style={{ color: "#A9A9A9" }} />;
      case "shower rain":
        return <FaCloudSunRain style={{ color: "#4682B4" }} />;
      case "light rain":
        return <FaCloudSunRain style={{ color: "#ADD8E6" }} />;
      case "rain":
        return <FaCloudRain style={{ color: "#1E90FF" }} />;
      case "thunderstorm":
        return <FaBolt style={{ color: "#FF4500" }} />;
      case "snow":
        return <FaSnowflake style={{ color: "#ADD8E6" }} />;
      case "mist":
        return <FaSmog style={{ color: "#778899" }} />;
      default:
        return <FaCloud style={{ color: "#B0C4DE" }} />;
    }
  };

  return (
    <Card className="weather-card">
      <Card.Body>
        <Card.Title className="weather-date">
          {formattedDate} {formattedTime}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted weather-description">
          <div className="icon-with-description">
            {getWeatherIcon(weatherInfo.description)} {weatherInfo.description}
          </div>
        </Card.Subtitle>
        <Card.Text>
          <strong>Temperature:</strong> {temp.toFixed(2)}°C <br />
          <strong>Feels Like:</strong> {feels_like.toFixed(2)}°C <br />
          <strong>Pressure:</strong> {pressure} hPa <br />
          <strong>Humidity:</strong> {humidity}% <br />
          <strong>Wind Speed:</strong> {wind.speed} m/s <br />
          <strong>Wind Gust:</strong> {wind.gust} m/s
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
