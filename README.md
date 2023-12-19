# Project Title
SUPcheck
## Overview

SUPcheck is an application for stand-up paddleboarders to check the weather, water conditions, and waves before going paddleboarding.

### Problem

Safety is important for paddleboarders; people need to check weather and water conditions. Some beginners may not know how to read the water condition. This application will warn users if it is not suitable for paddleboarding.

### User Profile

- Paddleboarder:
    - Looking for spots to paddleboard in BC Lower Mainland.
    - Wants to check the weather before paddleboarding.
    - Wants information about where to rent a paddleboard.

### Features

- As a user, I want to check the weather and water condition of a certain location.
- As a user, I want to check the closest location for paddleboarding.
- As a user, I want to check paddleboard rental information.

## Implementation

### Tech Stack

- React
- TypeScript
- MySQL
- Express
- Clinent libraries:
    - react
    - react-router
    - axios
- Server libraries
    - express
    - knex

### APIs

- open-meteo API

### Sitemap

- Home page
- Locations list
- Single location info

### Mockups

![Mockups](./mock-up.png)

### Data
Location
id: int
name: varchar
Longitude: decimal
Latitude: decimal
Rental: boolean
Day Pass: boolean

Weather
id: int
name: varchar
interval: int
temperature_2m: decimal
is_day: int
rain: decimal
showers: decimal
weather_code: int
pressure_msl: decimal
wind_speed_10m: decimal
wind_direction_10m: int
wind_gusts_10m: decimal
wave_height: decimal
wave_direction: int
wave_period: decimal
wind_wave_height: decimal
wind_wave_direction: int
wind_wave_period: decimal


### Endpoints

GET /locations/:id
- Get location by id
Parameters:
- id: location id as number

{
    "id": 1,
    "name": Buntzen Lake,
    "Latitude": 49.350626,
    "Longitude": -122.859859,
    "Rental": No,
    "Day Pass": Yes
}

GET /location/:id/weather
- Get weather by id
Parameters:
- id: location id as number

{
    "id": 1,
    "name": Buntzen Lake,
    "interval": 900,
    "temperature_2m": 6.5,
    "is_day": 0,
    "rain": 0.00,
    "showers": 0.00,
    "weather_code": 3,
    "pressure_msl": 1000.1,
    "wind_speed_10m": 3.3,
    "wind_direction_10m": 131,
    "wind_gusts_10m": 8.3,
    "wave_height": 0.06,
    "wave_direction": 292,
    "wave_period": 2.00,
    "wind_wave_height": 0.00,
    "wind_wave_direction": 180,
    "wind_wave_period": 1.00
}
### Auth

No

## Roadmap

- Create client
    - react project with routes and pages
- Create server
    - express project with routing with 15 locations
    - create endpoint to fetch data from api
- Feature: List locations 
    - Create GET /locations endpoint
- Feature: Single location
    - Create GET /location/:id
- Feature: Single location weather
    - Create GET /location/:id/weather
- Bug fixes
## Nice-to-haves
- Intergrate Google map 

