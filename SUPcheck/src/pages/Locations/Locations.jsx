import CityList from "../../components/CityList/CityList";
import LocationList from "../../components/LocationList/LocationList";
import {useState} from "react";

function Locations() {
    const [selectedCity, setSelectedCity] = useState('');

    // Function to handle the city change and update the selected city
    const handleCityChange = (city) => {
        setSelectedCity(city);
    };
    return(
        <>
        <CityList onCityChange={handleCityChange} />
        <LocationList selectedCity={selectedCity}/>
        </>
    )
}

export default Locations