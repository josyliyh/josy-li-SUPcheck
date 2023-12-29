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
          console.log(weatherData)
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
  const combinedWeather = {};

  if (weatherData) {
    // Combine weatherData1 and weatherData2 for each time entry
    if (weatherData.weatherData1 && weatherData.weatherData1.hourly && weatherData.weatherData1.hourly.time) {
      weatherData.weatherData1.hourly.time.forEach((time, index) => {
        if (!combinedWeather[time]) {
          combinedWeather[time] = {};
        }

        combinedWeather[time] = {
          ...combinedWeather[time],
          temperature: weatherData.weatherData1.hourly.temperature_2m[index],
          precipitation: weatherData.weatherData1.hourly.precipitation[index],
          visibility: weatherData.weatherData1.hourly.visibility[index],
          wind_speed: weatherData.weatherData1.hourly.wind_speed_10m[index],
          wind_gusts: weatherData.weatherData1.hourly.wind_gusts_10m[index]
        };
      });
    }

    if (weatherData.weatherData2 && weatherData.weatherData2.hourly && weatherData.weatherData2.hourly.time) {
      weatherData.weatherData2.hourly.time.forEach((time, index) => {
        if (!combinedWeather[time]) {
          combinedWeather[time] = {};
        }

        combinedWeather[time] = {
          ...combinedWeather[time],
          wave_height: weatherData.weatherData2.hourly.wave_height[index]
        };
      });
    }

    // Display the combined weather data for each time entry
    return Object.keys(combinedWeather).map((time, index) => (
      <div key={index}>
        <h3>Time: {time}</h3>
        <ul>
          {Object.entries(combinedWeather[time]).map(([key, value]) => (
            <li key={key}>
              {key.replace(/_/g, ' ').toUpperCase()}: {value} {key.includes('temperature') ? '°C' : key.includes('wave height') ? 'm' : ''}
            </li>
          ))}
        </ul>
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
