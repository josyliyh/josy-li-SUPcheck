import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function WeatherInfo() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedTime, setSelectedTime] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}/weather`);
        if (response.status === 200) {
          setWeatherData(response.data);
          console.log('Fetched weather data:', response.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleTimeSelection = (event) => {
    setSelectedTime(event.target.value);
    console.log('Selected time:', event.target.value);
  };

  const displayWeather = () => {
    let selectedWeather = {};
  
    if (!selectedTime) {
      const currentTime = new Date().toISOString().slice(0, 16);
      selectedWeather = weatherData[currentTime] || {};
    } else {
      // Search for the selected time in weatherData1
      const weatherData1 = weatherData['weatherData1'];
      const weatherData2 = weatherData['weatherData2'];
  
      const selectedWeather1 = weatherData1.hourly.time.findIndex(
        (time) => time === selectedTime
      );
      const selectedWeather2 = weatherData2.hourly.time.findIndex(
        (time) => time === selectedTime
      );
  
      if (selectedWeather1 !== -1) {
        selectedWeather = {
          ...selectedWeather,
          temperature: weatherData1.hourly.temperature_2m[selectedWeather1],
          precipitation: weatherData1.hourly.precipitation[selectedWeather1],
          visibility: weatherData1.hourly.visibility[selectedWeather1],
          wind_speed: weatherData1.hourly.wind_speed_10m[selectedWeather1],
          wind_gusts: weatherData1.hourly.wind_gusts_10m[selectedWeather1],
        };
      }
  
      if (selectedWeather2 !== -1) {
        selectedWeather = {
          ...selectedWeather,
          wave_height: weatherData2.hourly.wave_height[selectedWeather2],
        };
      }
    }
  
    if (!selectedWeather) {
      return <p>Please select a valid time</p>;
    }
  
    return (
      <div>
        <h3>Selected Time: {selectedTime || new Date().toISOString().slice(0, 16)}</h3>
        <ul>
          {Object.entries(selectedWeather).map(([key, value]) => (
            <li key={key}>
              {key.replace(/_/g, ' ').toUpperCase()}: {value}{' '}
              {key.includes('temperature')
                ? '°C'
                : key.includes('wave height')
                ? 'm'
                : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  
  return (
    <div>
      <h2>Weather Information for ID: {id}</h2>
      <form>
        <label htmlFor="datetime">Select Date and Time:</label>
        <input type="datetime-local" id="datetime" name="datetime" onChange={handleTimeSelection} />
      </form>
      <hr />
      {displayWeather()}
    </div>
  );
}

export default WeatherInfo;
