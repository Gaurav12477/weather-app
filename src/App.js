import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudShowersHeavy, faSnowflake, faBolt } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=aa0d024bfec362998b433fe3ccb492e9`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  function getWeatherIcon(iconCode) {
    const colorMap = {
      '01d': 'yellow',      // Sun - yellow
      '01n': 'yellow',      // Sun - yellow
      '02d': 'blue',        // Cloud - blue
      '02n': 'blue',        // Cloud - blue
      '03d': 'gray',        // Cloud - gray
      '03n': 'gray',        // Cloud - gray
      '04d': 'gray',        // Cloud - gray
      '04n': 'gray',        // Cloud - gray
      '09d': 'blue',        // Rainy - blue
      '09n': 'blue',        // Rainy - blue
      '10d': 'blue',        // Rainy - blue
      '10n': 'blue',        // Rainy - blue
      '11d': 'gray',        // Thunderstorm - gray
      '11n': 'gray',        // Thunderstorm - gray
      '13d': 'gray',        // Snow - gray
      '13n': 'gray',        // Snow - gray
      '50d': 'gray',        // Haze - gray
      '50n': 'gray',        // Haze - gray
    };
  
    const color = colorMap[iconCode] || 'black';  // Default color is black
  
    switch (iconCode) {
      case '01d':
      case '01n':
        return <FontAwesomeIcon icon={faSun} color={color} size="2x" />;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <FontAwesomeIcon icon={faCloud} color={color} size="2x" />;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <FontAwesomeIcon icon={faCloudShowersHeavy} color={color} size="2x" />;
      case '11d':
      case '11n':
        return <FontAwesomeIcon icon={faBolt} color={color} size="2x" />;
      case '13d':
      case '13n':
        return <FontAwesomeIcon icon={faSnowflake} color={color} size="2x" />;
      case '50d':
      case '50n':
        return <FontAwesomeIcon icon={faCloud} color={color} size="2x" />;
      default:
        return <FontAwesomeIcon icon={faSun} color={color} size="2x" />;
    }
  }
  
  
  

  function fahrenheit_to_celsius(fahrenheit) {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius.toFixed(1);
}



  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{fahrenheit_to_celsius(data.main.temp.toFixed())}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="weather-icon">
            {data.weather ? getWeatherIcon(data.weather[0].icon) : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;