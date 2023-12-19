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

- Home page (locations list)
- Single location info
- Single location weather

### Mockups

![Mockups](./mock-up.png)

### Data
## Location
- id: int
- name: varchar
- Longitude: decimal
- Latitude: decimal
- Rental: boolean
- Day Pass: boolean

## Weather
- temperature_2m: decimal
- rain: decimal
- wind_speed_10m: decimal
- wind_direction_10m: int
- wave_height: decimal
- wave_direction: int
- wave_period: decimal

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
    "name": "Buntzen Lake",
    "temperature_2m": 6.5,
    "rain": 0.00,
    "wind_speed_10m": 3.3,
    "wind_direction_10m": 131,
    "wave_height": 0.06,
    "wave_direction": 292,
    "wave_period": 2.00
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
- Favourite function 
    - User can save their favourite location and it will show on the top of the list

