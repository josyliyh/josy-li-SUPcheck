const axios = require("axios");
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();
const apiKey = process.env.APIKEY;

// Function to get all locations
const getAllLocations = async (req, res) => {
  try {
    const locationsFound = await knex("locations");
    res.status(200).send(locationsFound);
  } catch (error) {
    console.error("Error retrieving all locations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get one location
const getOneLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const locationFound = await knex("locations")
      .select("*")
      .where("id", locationId)
      .first();

    if (!locationFound) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(200).json(locationFound);
  } catch (error) {
    console.error("Error retrieving single location:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to fetch weather data by coordinates
const getWeatherForcast = async (latitude, longitude) => {
  try {
    const weatherAPIURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,visibility,wind_speed_10m,wind_gusts_10m,weather_code&daily=sunrise,sunset&forecast_days=3&timezone=America%2FLos_Angeles`;
    const response = await axios.get(weatherAPIURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data from the API");
  }
};

// Function to fetch marine data by coordinates
const getMarineForcast = async (latitude, longitude) => {
  try {
    const marineAPIURL = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height&length_unit=metric&forecast_days=3&timezone=America%2FLos_Angeles`;
    const response = await axios.get(marineAPIURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching marine forecast data:", error);
    throw new Error("Error fetching marine forecast from the API");
  }
};

const getLocationById = async (id) => {
  try {
    const location = await knex("locations")
      .select("*")
      .where("id", id)
      .first();
    return location;
  } catch (error) {
    console.error("Error fetching location from the database:", error);
    throw new Error("Error fetching location from the database");
  }
};

const getLocationAndWeather = async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await getLocationById(locationId);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const { Latitude, Longitude } = location;

    // Ensure Latitude and Longitude are valid
    if (Latitude && Longitude) {
      // Use the fetched coordinates to fetch weather data
      const weatherData1 = await getWeatherForcast(Latitude, Longitude);
      const weatherData2 = await getMarineForcast(Latitude, Longitude);

      // Combine location info and weather data
      const locationWithWeather = {
        locationInfo: location,
        weatherData1,
        weatherData2,
      };

      return res.status(200).json(locationWithWeather);
    } else {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get an image by id

const getLocationImage = async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await getLocationById(locationId);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const { name } = location;

    // Ensure name is valid
    if (name) {
      // Get Place ID by location name
      const placeIdUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
        name
      )}&inputtype=textquery&fields=place_id&key=${apiKey}`;
      const placeIdResponse = await axios.get(placeIdUrl);
      const placeId = placeIdResponse.data.candidates[0]?.place_id;

      if (!placeId) {
        throw new Error("Place ID not found");
      }

      // Get photo reference by Place ID
      const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
      const placeDetailsResponse = await axios.get(placeDetailsUrl);
      const photoReference =
        placeDetailsResponse.data.result?.photos[0]?.photo_reference;

      if (!photoReference) {
        throw new Error("Photo reference not found");
      }

      // Get image URL using photo reference
      const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photoReference}&key=${apiKey}`;

      return res.status(200).json(imageUrl);
    } else {
      return res.status(400).json({ error: "Invalid name" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllLocations,
  getLocationAndWeather,
  getOneLocation,
  getLocationImage,
};
