import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL, PORT } from "../../assets/urls/urls";

function CityList ({ onCityChange }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${URL}${PORT}`);
        if (response.status === 200) {
          const data = response.data;
          // Filter out duplicate cities based on their names
          const uniqueCities = removeDuplicates(data, 'city');
          setCities(uniqueCities);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCities();
  }, []);

  // Function to remove duplicates based on a property
  const removeDuplicates = (arr, prop) => {
    return arr.filter((obj, index, self) =>
      index === self.findIndex((o) => o[prop] === obj[prop])
    );
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    if (onCityChange) {
      onCityChange(selectedCity); // Pass selectedCity
    }
  };

  return (
    <div>
      <select value={selectedCity}  onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city.city}>
            {city.city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityList;
