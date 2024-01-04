import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WMOWeatherCode from "../../assets/WMO/WMO";
import "./WeatherInfo.scss"


function WeatherInfo() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedHour, setSelectedHour] = useState('00:00');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}/weather`);
        if (response.status === 200) {
          setWeatherData(response.data);
          console.log("Fetched weather data:", response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", selectedDate);
  };
  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
    console.log('Selected hour:', hour);
  };

  const displayWeather = () => {
    const selectedWeatherData1 = weatherData["weatherData1"];
    const selectedWeatherData2 = weatherData["weatherData2"];

    if (!selectedWeatherData1 || !selectedWeatherData2) {
      return <p>No weather information available</p>;
    }

    const selectedWeatherIndex = selectedWeatherData1.hourly.time.findIndex(
      (time) => time.split("T")[0] === selectedDate
    );

    if (selectedWeatherIndex === -1) {
      return <p>No weather information available for the selected date</p>;
    }

    return (
      <div className="weather-container">
        
        {selectedWeatherData1.hourly.time.map((time, index) => {
          if (time.split("T")[0] === selectedDate) {
            const waveHeight = selectedWeatherData2.hourly.wave_height[index];
            const windSpeed = selectedWeatherData1.hourly.wind_speed_10m[index];
            const windGust = selectedWeatherData1.hourly.wind_gusts_10m[index];

            const weatherCode = selectedWeatherData1.hourly.weather_code[index];
            const hour = parseInt(time.split("T")[1].split(":")[0]);
            const isDayTime = hour >= 6 && hour < 18;

            const weatherInfo = isDayTime
              ? WMOWeatherCode[weatherCode]?.day
              : WMOWeatherCode[weatherCode]?.night;

            const weatherDescription =
              weatherInfo?.description || "Weather description not available";

            const weatherImage =
              weatherInfo?.image || "Weather image not available";

            return (
              <div className="weather__info" key={index}>
                   <div className="weather__info-item"> <h4>{hour}</h4></div>

                <div className="weather__info-item">
                  <img src={weatherImage} alt={weatherDescription} />

                </div>
                <div className="weather__info-item">
                  <span className="info-title">Temperature:</span>
                  <span className="info-value">
                    {selectedWeatherData1.hourly.temperature_2m[index]} °C
                  </span>
                </div>
                <div className="weather__info-item">
                  <span className="info-title">Precipitation:</span>
                  <span className="info-value">
                    {selectedWeatherData1.hourly.precipitation[index]} mm
                  </span>
                </div>
                <div className="weather__info-item">
                  <span className="info-title">Visibility:</span>
                  <span className="info-value">
                    {selectedWeatherData1.hourly.visibility[index]} m
                  </span>
                </div>
                <div className="weather__info-item">
                  <span className="info-title">Wind Speed:</span>
                  <span className="info-value">{windSpeed} km/h</span>
                </div>
                <div className="weather__info-item">
                  <span className="info-title">Wind Gust:</span>
                  <span className="info-value">{windGust} km/h</span>
                </div>
                <div className="weather__info-item">
                  <span className="info-title">Wave Height:</span>
                  <span className="info-value">{waveHeight} m</span>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div>
     
      <div>
        <button
          onClick={() =>
            handleDateSelection(new Date().toISOString().split("T")[0])
          }
        >
          Today
        </button>
        <button
          onClick={() =>
            handleDateSelection(
              new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            )
          }
        >
          Tomorrow
        </button>
        <button
          onClick={() =>
            handleDateSelection(
              new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            )
          }
        >
          Day After
        </button>
      </div>
      
      <div className="weather">
      <h3>Date: {selectedDate}</h3>
        <div className="weather__header">
          <h3 className="weather__title">Time</h3>
          <h3 className="weather__title">Weather</h3>

          <h3 className="weather__title">Temperature</h3>

          <h3 className="weather__title">Precipitation</h3>

          <h3 className="weather__title">Visibility</h3>

          <h3 className="weather__title">Wind Speed</h3>
          <h3 className="weather__title">Wind Gust</h3>
          <h3 className="weather__title">Wave Height</h3>


        </div>
        {displayWeather()}</div>
    </div>
  );
}

export default WeatherInfo;
