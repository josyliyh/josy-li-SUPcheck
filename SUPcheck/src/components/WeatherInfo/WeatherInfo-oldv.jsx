import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function WeatherInfo() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [selectedHour, setSelectedHour] = useState('00:00');
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
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };
  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
    console.log('Selected hour:', hour);
  };
  const displayWeather = () => {
    const selectedTime = `${selectedDate}T${selectedHour}`;
    let selectedWeather = {};
  
    const weatherData1 = weatherData['weatherData1'];
    const weatherData2 = weatherData['weatherData2'];
  
    if (weatherData1 && weatherData1.hourly && weatherData2 && weatherData2.hourly) {
      const selectedWeather1 = weatherData1.hourly.time.findIndex((time) => time === selectedTime);
      const selectedWeather2 = weatherData2.hourly.time.findIndex((time) => time === selectedTime);
  
      if (selectedWeather1 !== -1) {
        selectedWeather = {
          ...selectedWeather,
          temperature: `${weatherData1.hourly.temperature_2m[selectedWeather1]} °C`,
          precipitation: weatherData1.hourly.precipitation[selectedWeather1],
          visibility: `${weatherData1.hourly.visibility[selectedWeather1]} m`,
          wind_speed: `${weatherData1.hourly.wind_speed_10m[selectedWeather1]} kph`,
          wind_gusts: `${weatherData1.hourly.wind_gusts_10m[selectedWeather1]} kph`,
        };
      }
  
      if (selectedWeather2 !== -1) {
        selectedWeather = {
          ...selectedWeather,
          wave_height: `${weatherData2.hourly.wave_height[selectedWeather2]} m`,
        };
      }
    } else {
      return <p>Weather data not available or has an unexpected format</p>;
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
              {key.replace(/_/g, ' ').toUpperCase()}: {value}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const hours = Array.from({ length: 24 }, (_, i) => `0${i}`.slice(-2));
  return (
    <div>
      <h2>Weather Information for ID: {id}</h2>
      <div>
        <button onClick={() => handleDateSelection(new Date().toISOString().split('T')[0])}>Today</button>
        <button onClick={() => handleDateSelection(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0])}>Tomorrow</button>
        <button onClick={() => handleDateSelection(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}>Day After</button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="range"
            min="0"
            max="23"
            step="1"
            style={{ width: '100%' }}
            onChange={(e) => handleHourSelection(`${String(e.target.value).padStart(2, '0')}:00`)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: '-20px', width: '100%' }}>
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} style={{ flex: '1', textAlign: 'center' }}>
                {i}
              </span>
            ))}
          </div>
        </div>
        </div>
        {displayWeather()}
    </div>
  );
}
export default WeatherInfo;
