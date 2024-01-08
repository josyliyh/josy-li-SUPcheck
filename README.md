# Project Title
SUPcheck
## Overview

SUPcheck is an application for stand-up paddleboarders to check the weather before going paddleboarding.

## Implementation

### Front-end Tech Stack

- React
- Vite
- SASS
- Axios

### Back-end Tech Stack
- Express.js
- Node.js
- Knex.js
- MySQL

### External APIs

- Open-meteo API
- Google Map API

### Sitemap

- Home page (locations list)
- Single location 

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
- visibility: decimal
- wind_speed_10m: decimal
- wind_gusts_10m: decimal
- precipitation: decimal
- wave_height: decimal
- sunset: DATETIME
- sunrise: DATETIME

### Endpoints

GET /locations/:id
- Get location by id
Parameters:
- id: location id as number

GET /location/:id/weather
- Get weather by id
Parameters:
- id: location id as number

## Nice-to-haves
- Favourite function 
    - User can save their favourite location and it will show on the top of the list

