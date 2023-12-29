import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { URL, PORT } from '../../assets/urls/urls';

const LocationList = ({ selectedCity }) => {
  const [locations, setLocations] = useState([]);
  const [locationsWithImages, setLocationsWithImages] = useState([]);

  const fetchImageUrl = async (locationId) => {
    try {
      const response = await axios.get(`${URL}${PORT}/${locationId}/image`);
      return response.data; // Assuming the response contains the image URL
    } catch (error) {
      console.error(`Error fetching image for location ${locationId}:`, error);
      return null;
    }
  };

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

  useEffect(() => {
    const updateLocationsWithImages = async () => {
      try {
        const locationsWithImages = await Promise.all(
          locations.map(async (location) => {
            const imageUrl = await fetchImageUrl(location.id);
            return { ...location, imageUrl };
          })
        );
        setLocationsWithImages(locationsWithImages);
      } catch (error) {
        console.error('Error updating locations with images:', error);
      }
    };

    updateLocationsWithImages();
  }, [locations]);

  // Filter locations based on the selected city
  const filteredLocations = selectedCity
    ? locationsWithImages.filter((location) => location.city === selectedCity)
    : locationsWithImages;

  return (
    <div>
      <h2>Locations</h2>
      <div className="location-list">
        {filteredLocations.map((location) => (
          <Link key={location.id} to={`/${location.id}`}>
            <div className="location-card">
              <h3>{location.name}</h3>
              <p>City: {location.city}</p>
              {location.imageUrl && (
                <img src={location.imageUrl} alt={`Image for ${location.name}`} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
