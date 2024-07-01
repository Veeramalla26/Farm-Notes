import React, { useState, useEffect } from "react";
import { Container, Spinner, Row, Col, Form, Button } from "react-bootstrap";
import { getWeather } from "../serviceApis/loginapi";
import "./weather-report.scss";
import WeatherCard from "./weather-card";

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getWeather({ city: cityName });
      if (response && response.cod === "200") {
        setWeatherData(response);
      } else {
        setError("Please search with a correct city name.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Error fetching weather. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    fetchWeather("Ireland"); // Default city on load
  }, []);

  return (
    <Container className="weather-report">
      <h1>Weather Report</h1>
      <Form onSubmit={handleSearch} className="search-form">
        <Form.Group controlId="citySearch">
          <Form.Control
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="custom-button">
          Search
        </Button>
      </Form>
      {loading && (
        <div className="loading-spinner">
          <Spinner animation="border" />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {weatherData && !loading && !error && (
        <>
          <h2 className="weather-title">
            Weather Report for {weatherData.city.name}
          </h2>
          <div className="weather-content">
            <Row>
              {weatherData.list.map((weather) => (
                <Col key={weather.dt} xs={12} md={6} lg={4}>
                  <WeatherCard weather={weather} />
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default WeatherReport;
