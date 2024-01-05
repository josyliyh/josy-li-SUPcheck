import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WMOWeatherCode from "../../assets/WMO/WMO";
import "./WeatherInfo.scss";

function WeatherInfo() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedHour, setSelectedHour] = useState("23:00");
  const [selectedDay, setSelectedDay] = useState("0");

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
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };
  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
    console.log("Selected hour:", hour);
  };
  const displayWeather = () => {
    const selectedTime = `${selectedDate}T${selectedHour}`;
    let selectedWeather = {};

    const weatherData1 = weatherData["weatherData1"];
    const weatherData2 = weatherData["weatherData2"];

    if (
      weatherData1 &&
      weatherData1.hourly &&
      weatherData2 &&
      weatherData2.hourly
    ) {
      const selectedWeather1 = weatherData1.hourly.time.findIndex(
        (time) => time === selectedTime
      );
      const selectedWeather2 = weatherData2.hourly.time.findIndex(
        (time) => time === selectedTime
      );

      const weatherCode = weatherData1.hourly.weather_code[selectedWeather1];
      console.log("Day", selectedDay);
      const sunsetTime = weatherData1.daily.sunset[selectedDay];

      const sunriseTime = weatherData1.daily.sunrise[selectedDay];
      console.log("rise", sunriseTime);
      console.log(selectedTime);
      function isDaytime(selectedTime, sunriseTime, sunsetTime) {
        const selectedHour = new Date(selectedTime).getHours();
        const sunriseHour = new Date(sunriseTime).getHours();
        const sunsetHour = new Date(sunsetTime).getHours();

        return selectedHour >= sunriseHour && selectedHour < sunsetHour;
      }

      const isDay = isDaytime(selectedTime, sunriseTime, sunsetTime);

      const weatherInfo = isDay
        ? WMOWeatherCode[weatherCode]?.day
        : WMOWeatherCode[weatherCode]?.night;

      const weatherDescription =
        weatherInfo?.description || "Weather description not available";

      const weatherImage = weatherInfo?.image || "Weather image not available";

      if (selectedWeather1 !== -1) {
        selectedWeather = {
          ...selectedWeather,
          image: weatherImage,
          description: weatherDescription,
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
    const dateTime = new Date(selectedTime);
    const formattedDateTime = dateTime.toLocaleString();
    if (!selectedWeather) {
      return <p>Please select a valid time</p>;
    }
    return (
      <div>
        <h2 className="weather__wrapper--title">
          Ready for Paddleboarding on...
          {formattedDateTime || new Date().toISOString().split("T")[0]}
        </h2>
        <ul className="weather__list">
          <li className="weather__data weather__image--wrapper">
            {selectedWeather.image && (
              <img
                src={selectedWeather.image}
                alt={selectedWeather.description}
                className="weather__image"
              />
            )}
            <p className="weather__value">{selectedWeather.description}</p>
            <p className="weather__value">{selectedWeather.temperature}</p>
          </li>
          <li className="weather__data weather__data--wind">
            <h3 className="weather__title">WIND SPEED</h3>
            <p className="weather__value">{selectedWeather.wind_speed}</p>
          </li>
          <li className="weather__data weather__data--gust">
            <h3 className="weather__title">WIND GUSTS</h3>
            <p className="weather__value">{selectedWeather.wind_gusts}</p>
          </li>

          <li className="weather__data weather__data--visibility">
            <h3 className="weather__title">VISIBILITY</h3>
            <p className="weather__value">{selectedWeather.visibility}</p>
          </li>
          <li className="weather__data weather__data--wave">
            <h3 className="weather__title">WAVE HEIGHT</h3>
            <p className="weather__value">{selectedWeather.wave_height}</p>
          </li>
          {/* <li className="weather__data">
            <h3 className="weather__title">PRECIPITATION</h3>
            <p className="weather__value">{selectedWeather.precipitation}</p>
          </li>
          <li className="weather__data">
            <h3 className="weather__title">SUNSET</h3>
            <p className="weather__value">{selectedWeather.precipitation}</p>
          </li> */}
        </ul>
      </div>
    );
  };
  return (
    <div className="weather__wrapper">
      <h2 className="weather__header">Let's Check Out the Weather!</h2>
      <div className="weather__date--wrapper">
        <button
          onClick={() => {
            handleDateSelection(
              new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            );
            handleDaySelection(0);
          }}
        >
          Today
        </button>
        <button
          onClick={() => {
            handleDateSelection(new Date().toISOString().split("T")[0]);
            handleDaySelection(1);
          }}
        >
          Tomorrow
        </button>
        <button
          onClick={() => {
            handleDateSelection(
              new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            );
            handleDaySelection(2);
          }}
        >
          Day After
        </button>
      </div>

      <div className="time-bar-container">
        <div className="time-bar-wrapper">
          <input
            type="range"
            min="0"
            max="23"
            step="1"
            className="time-bar"
            onChange={(e) =>
              handleHourSelection(
                `${String(e.target.value).padStart(2, "0")}:00`
              )
            }
          />
          <div className="hour-labels-wrapper">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i * 2} className="hour-label">
                {i * 2}
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
