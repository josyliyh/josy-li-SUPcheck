import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { URL, PORT } from '../../assets/urls/urls';
import "./LocationInfo.scss"


function LocationInfo (){
    const [locationData, setLocationData] = useState({});
    const [weatherData, setWeatherData] = useState({});
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}${PORT}/${id}`);
          if (response.status === 200) {
            setLocationData(response.data);
            const imageUrl = await fetchImageUrl(id);
           setImageUrl(imageUrl);
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      };
  
      fetchData();
    }, [id]);

    const fetchImageUrl = async (id) => {
      try {
        const response = await axios.get(`${URL}${PORT}/${id}/image`);
        return response.data; 
      } catch (error) {
        console.error(`Error fetching image for location ${id}:`, error);
        return null;
      }
    };

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
            className="spot__map"
          ></iframe>
        );
      };

        
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}${PORT}/${id}/weather`);
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
    return (
      <div className='spot'>
        <img src={imageUrl} alt="" className="spot__image" />
        <h2>{locationData.name}</h2>
        <ul>
       
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