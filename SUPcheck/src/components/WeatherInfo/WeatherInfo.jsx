import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function WeatherInfo() {
  const [weatherData, setWeatherData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}/weather`);
        if (response.status === 200) {
          setWeatherData(response.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchData();
  }, [id]);

  const displayWeather = () => {
    if (weatherData && weatherData.weatherData1) {
      return weatherData.weatherData1.hourly.time.map((time, index) => (
        <div key={index}>
          <p>Time: {time}</p>
          <p>Temperature: {weatherData.weatherData1.hourly.temperature_2m[index]}°C</p>
        </div>
      ));
    } else {
      return <p>No weather data available</p>;
    }
  };
  
  return (
    <div>
      <h2>Weather Information for ID: {id}</h2>
      {displayWeather()}
    </div>
  );
}


export default WeatherInfo;
