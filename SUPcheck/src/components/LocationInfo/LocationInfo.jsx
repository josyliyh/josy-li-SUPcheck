import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LocationInfo (){
    const [locationData, setLocationData] = useState({});
    const { id } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/${id}`);
          if (response.status === 200) {
            setLocationData(response.data);

          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      };
  
      fetchData();
    }, [id]);

    const displayBooleanValue = (value) => {
        return value ? 'Yes' : 'No';
      };
      
 
      const generateGoogleMapsUrl = (apiKey, locationName) => {
        const encodedLocationName = encodeURIComponent(locationName);
        return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocationName}`;
      };
    
      const embedGoogleMap = (apiKey, locationName) => {
        const mapUrl = generateGoogleMapsUrl(apiKey, locationName);
    
        return (
          <iframe
            title="Google Map"
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            frameBorder="0"
            src={mapUrl}
          ></iframe>
        );
      };
    return (
      <div>
        <h2>Location Information</h2>
        <ul>
          <li>
            <strong>Name:</strong> {locationData.name}
          </li>
          <li>
          <strong>Rental:</strong> {displayBooleanValue(locationData.Rental)}
        </li>
        <li>
          <strong>DayPass:</strong> {displayBooleanValue(locationData.DayPass)}
        </li>
          <li>
            <strong>City:</strong> {locationData.city}
          </li>
          <li>
            <strong>Address:</strong> {locationData.address}
          </li>
          {locationData.name && embedGoogleMap('AIzaSyC2cJy54-ajAGRqG0WoPovgW1Gowt4S8i0', locationData.name)}

        </ul>
      </div>
    );
}

export default LocationInfo