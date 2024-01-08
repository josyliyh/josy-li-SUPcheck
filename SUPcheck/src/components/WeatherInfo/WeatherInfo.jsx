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
  useEffect(() => {});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}/weather`);
        if (response.status === 200) {
          setWeatherData(response.data);
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
      const sunsetTime = weatherData1.daily.sunset[selectedDay];

      const sunriseTime = weatherData1.daily.sunrise[selectedDay];

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
          weather_code: `${weatherData1.hourly.weather_code[selectedWeather1]}`,
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

    const temperature = parseFloat(selectedWeather.temperature);
    const precipitation = parseFloat(selectedWeather.precipitation);
    const visibility = parseFloat(selectedWeather.visibility);
    const windSpeed = parseFloat(selectedWeather.wind_speed);
    const windGusts = parseFloat(selectedWeather.wind_gusts);
    const waveHeight = parseFloat(selectedWeather.wave_height);
    const weatherCode = parseFloat(selectedWeather.weather_code);
    let safety = "Not recommended";
    const safeWeatherCodes = [0, 1, 2, 3, 45, 51, 61, 48];

    if (
      // Conditions for Beginners
      temperature >= 15 &&
      temperature <= 29 &&
      precipitation === 0 &&
      visibility >= 5000 &&
      windSpeed <= 15 &&
      windGusts <= 20 &&
      waveHeight <= 0.3 &&
      safeWeatherCodes.includes(weatherCode)
    ) {
      safety = "Safe for Beginners";
    } else if (
      // Conditions for Moderate Paddlers
      temperature >= 10 &&
      temperature <= 32 &&
      precipitation <= 4 &&
      visibility >= 3000 &&
      windSpeed <= 25 &&
      windGusts <= 30 &&
      waveHeight <= 1 &&
      safeWeatherCodes.includes(weatherCode)
    ) {
      safety = "Moderate and Experienced Paddlers";
    } else if (
      // Conditions for Experienced Paddlers
      // commented out temperature and waveHeight for testing 
      // temperature >= 4 &&
      temperature <= 38 &&
      precipitation <= 5 &&
      visibility >= 3000 &&
      windSpeed <= 35 &&
      windGusts <= 40 &&
      // waveHeight <= 1 &&
      safeWeatherCodes.includes(weatherCode)
    ) {
      safety = "Experienced Paddlers ";
    }
    
    selectedWeather = {
      ...selectedWeather,
      safety: safety,
    };

    const dateTime = new Date(selectedTime);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDateTime = dateTime
      .toLocaleString(undefined, options)
      .replace(",", "");
    if (!selectedWeather) {
      return <p>Please select a valid time</p>;
    }

    return (
      <>
        <ul className="weather__list">
          <div className="weather__data--row">
          <li className="weather__data weather__image--wrapper">
            <h2 className="weather__wrapper--title">
              {formattedDateTime || new Date().toISOString().split("T")[0]}
            </h2>
            {selectedWeather.image && (
              <img
                src={selectedWeather.image}
                alt={selectedWeather.description}
                className="weather__image"
              />
            )}
            <p className="weather__value">{selectedWeather.description}</p>
            <p className="weather__value">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#f0f0f0"
                  fillRule="evenodd"
                  d="M8.25 5a3.75 3.75 0 1 1 7.5 0v6.348c0 .072.04.18.158.274a6.25 6.25 0 1 1-7.816 0c.118-.095.158-.202.158-.274zM12 2.75A2.25 2.25 0 0 0 9.75 5v6.348c0 .603-.31 1.116-.72 1.444a4.75 4.75 0 1 0 5.939 0c-.409-.328-.719-.84-.719-1.444V5A2.25 2.25 0 0 0 12 2.75m0 1.5a.75.75 0 0 1 .75.75v8.337a3.251 3.251 0 1 1-1.5 0V5a.75.75 0 0 1 .75-.75m0 10.5a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5"
                  clipRule="evenodd"
                />
              </svg>{" "}
              {selectedWeather.temperature}
            </p>
          </li>
          <li className="weather__data weather__data--sun">
            <h3 className="weather__title--sun">
              SUNRISE{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#f0f0f0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.5 17.5a3.5 3.5 0 1 0-7 0M11.9 3v7m-6.002 1.398l1.278 1.278M3 17.4h1.8m14.2 0h1.8m-4.176-4.724l1.278-1.278M21 21H3M8.3 6.6L11.9 3l3.6 3.6"
                />
              </svg>
            </h3>
            <p className=" weather__value weather__value--sun">
              {weatherData.weatherData1.daily.sunrise[selectedDay]
                .split("T")[1]
                .slice(0, 5)}
            </p>
            <h3 className="weather__title--sun">
              SUNSET{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#f0f0f0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.5 17.5a3.5 3.5 0 1 0-7 0M11.9 3v7m-6.002 1.398l1.278 1.278M3 17.4h1.8m14.2 0h1.8m-4.176-4.724l1.278-1.278M21 21H3M8.3 7l3.6 3.6L15.5 7"
                />
              </svg>
            </h3>
            <p className=" weather__value weather__value--sun">
              {" "}
              {weatherData.weatherData1.daily.sunset[selectedDay]
                .split("T")[1]
                .slice(0, 5)}
            </p>
          </li>
          </div>
          <div className="weather__data--wrapper">
          <div className="row">
            <li className="weather__data weather__data--wind">
              <h3 className="weather__title">
                WIND SPEED{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill="none"
                    stroke="#f0f0f0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5.5a1.75 1.75 0 0 1 0 3.5h-7m11.25 6.5a1.75 1.75 0 0 0 0-3.5H2m5.25 6.5a1.75 1.75 0 0 0 0-3.5H1.5"
                  />
                </svg>
              </h3>
              <p className="weather__value">{selectedWeather.wind_speed}</p>
            </li>
            <li className="weather__data weather__data--gust">
              <h3 className="weather__title">
                WIND GUSTS{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#f0f0f0"
                    d="m29.316 8.051l-18-6a1 1 0 0 0-.916.149L4 7V2H2v28h2V11l6.4 4.8a1 1 0 0 0 .917.149l18-6a1 1 0 0 0 0-1.897ZM10 13L4.667 9L10 5Zm4-.054l-2 .667V4.387l2 .667Zm4-1.333l-2 .666V5.721l2 .666Zm2-.667V7.054L25.838 9Z"
                  />
                  <path
                    fill="#f0f0f0"
                    d="M20 22a4 4 0 0 0-8 0h2a2 2 0 1 1 2 2H8v2h8a4.005 4.005 0 0 0 4-4"
                  />
                  <path
                    fill="#f0f0f0"
                    d="M26 22a4.005 4.005 0 0 0-4 4h2a2 2 0 1 1 2 2H12v2h14a4 4 0 0 0 0-8"
                  />
                </svg>
              </h3>
              <p className="weather__value">{selectedWeather.wind_gusts}</p>
            </li>
            </div>
            <div className="row">
            <li className="weather__data weather__data--visibility">
              <h3 className="weather__title">
                VISIBILITY{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#f0f0f0"
                    d="M12 6.5c2.76 0 5 2.24 5 5c0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24M2.71 3.16a.996.996 0 0 0 0 1.41l1.97 1.97A11.892 11.892 0 0 0 1 11.5C2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72a.996.996 0 1 0 1.41-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0M12 16.5c-2.76 0-5-2.24-5-5c0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57c0 1.66 1.34 3 3 3c.2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5m2.97-5.33a2.97 2.97 0 0 0-2.64-2.64z"
                  />
                </svg>
              </h3>
              <p className="weather__value">{selectedWeather.visibility}</p>
            </li>
            <li className="weather__data weather__data--wave">
              <h3 className="weather__title">
                WAVE HEIGHT{" "}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="#f0f0f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10c2.483 0 4.345-3 4.345-3s1.862 3 4.345 3c2.482 0 4.965-3 4.965-3s2.483 3 4.345 3M3 17c2.483 0 4.345-3 4.345-3s1.862 3 4.345 3c2.482 0 4.965-3 4.965-3s2.483 3 4.345 3"/></svg>
              </h3>
              <p className="weather__value">{selectedWeather.wave_height}</p>
            </li>
            </div>
            <div className="row">
            <li className="weather__data weather__data--precipitation">
              <h3 className="weather__title">
                PRECIPITATION{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="#f0f0f0"
                    d="M1607 1166q28 57 42 118t15 124q0 88-23 170t-64 153t-100 129t-130 100t-153 65t-170 23q-88 0-170-23t-153-64t-129-100t-100-130t-65-153t-23-170q0-63 14-124t43-118L1024 0zm-583 754q106 0 199-40t163-109t110-163t40-200q0-48-11-95t-33-90l-468-937l-468 937q-22 43-33 90t-11 95q0 106 40 199t109 163t163 110t200 40"
                  />
                </svg>
              </h3>
              <p className="weather__value">{selectedWeather.precipitation}</p>
            </li>
            <li className="weather__data weather__data--safety">
              <h3 className="weather__title">
                SAFETY{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#f0f0f0"
                    d="M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110l312 110z"
                  />
                  <path
                    fill="#f0f0f0"
                    d="M378.4 475.1a35.91 35.91 0 0 0-50.9 0a35.91 35.91 0 0 0 0 50.9l129.4 129.4l2.1 2.1a33.98 33.98 0 0 0 48.1 0L730.6 434a33.98 33.98 0 0 0 0-48.1l-2.8-2.8a33.98 33.98 0 0 0-48.1 0L483 579.7z"
                  />
                </svg>
              </h3>
              <p className="weather__value weather__value--safety">{selectedWeather.safety}</p>
            </li>
            </div>
          </div>

          {selectedDay !== null && <div></div>}
        </ul>
      </>
    );
  };
  return (
    <div className="weather__wrapper">
      <h2 className="weather__header">Let's Check Out the Weather!</h2>

      {weatherData &&
      weatherData.weatherData1 &&
      weatherData.weatherData1.daily &&
      weatherData.weatherData1.daily.time ? (
        <div className="weather__date--wrapper">
          {weatherData.weatherData1.daily.time.map((date, index) => (
            <button
              key={index}
              onClick={() => {
                handleDateSelection(date);
                handleDaySelection(index);
              }}
            >
              {index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Day After"} -{" "}
              {date}
            </button>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}

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
          <label htmlFor="range" id="value"></label>
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
