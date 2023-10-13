import React, { useState } from 'react';
import './weatherapp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
  const api_key = '5bd5248849efdb753866d3e881bc76e9';

  const [wicon, setWicon] = useState(cloud_icon);
  const [cityName, setCityName] = useState(''); // Store city name
  const [error, setError] = useState(null);

  const search = async () => {
    if (cityName === '') {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-rate');
      const temperature = document.getElementsByClassName('weather-temp');

      humidity[0].innerHTML = data.main.humidity + ' %';
      wind[0].innerHTML = data.wind.speed + ' Km/h';
      temperature[0].innerHTML = data.main.temp + '°c';
      setCityName(data.name); // Update the city name
      setError(null);

      // Setting weather icons
      if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setWicon(clear_icon);
      } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      setError('City not found');
    }
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
    setError(null); // Clear the error when the input field is changed
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="search city..."
          value={cityName}
          onChange={handleInputChange}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <div className="weather-image">
            <img src={wicon} alt="icon" />
          </div>
          <div className="weather-temp">Temp°C</div>
          <div className="weather-location">{cityName || 'CITY'}</div>

          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="humidity-icon" className="icon" />
              <div className="data">
                <div className="humidity-percent">0 %</div>
                <div className="text">Humidity</div>
              </div>
            </div>

            <div className="element">
              <img src={wind_icon} alt="wind-icon" className="icon" />
              <div className="data">
                <div className="wind-rate">0 Km/h</div>
                <div className="text">Wind speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
