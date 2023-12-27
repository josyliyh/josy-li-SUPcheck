import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL, PORT } from "../../assets/urls/urls";


const LocationList = ({ selectedCity }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${URL}${PORT}`);
        if (response.status === 200) {
          const data = response.data;
          setLocations(data); 
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on the selected city
  const filteredLocations = selectedCity
    ? locations.filter(location => location.city === selectedCity)
    : locations;

  return (
    <div>
      <h2>Locations</h2>
      <div className="location-list">
        {filteredLocations.map((location, index) => (
          <div key={index} className="location-card">
            <h3>{location.name}</h3>
            <p>City: {location.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
