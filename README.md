# SUPcheck

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
#### Location
- id: int
- name: varchar
- Longitude: decimal
- Latitude: decimal
- Rental: boolean
- Day Pass: boolean

#### Weather
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

## Setup
### Backend 
Navigate to SUPcheck-api Directory

```
cd SUPcheck-api
```
Use .env.sample as a template to create Environment File
- Create a new file named .env in the SUPcheck-api directory.
- Copy the content of .env.sample into .env.
- Replace placeholders <YOUR_DB_NAME>, <YOUR_DB_USER>, and <YOUR_DB_PASSWORD> with your MySQL database details.

Install nodeJS dependencies
```
npm i
```
Create and select the SUPcheck database in MySQL workbrench
```
CREATE DATABASE SUPcheck;
USE SUPcheck;
```

Create database tables with knex migrations
```
npm run migrate
```

Seed the tables with data
```
npm run seed
```

Run Express App in development mode
```
npm run dev
```
### Frontend 
Navigate to SUPcheck Directory

```
cd SUPcheck
```
Install nodeJS dependencies
```
npm i
```
Run React App in development mode
```
npm run dev
```
## Screenshots
Location list
![Location list](./screenshots/location-list.png)
Single location
![Single location](./screenshots/single-location.png)
Weather-mobile
![Weather-mobile](./screenshots/weather-mobile.png)
Weather-tablet
![Weather-tablet](./screenshots/weather-tablet.png)
Weather-desktop
![Weather-desktop](./screenshots/weather-desktop.png)


## Lessons Learned

### Backend Development
- **Backend Setup:** Constructed backend server with MySQL using Knex for migrations, seeding, and endpoint logic via controllers
### API Integration
- **API Understanding:** Explored Open-Meteo and Google Maps APIs for data retrieval.
- **Image Retrieval:** Successfully fetched location images using coordinates.

### Frontend Styling (SASS & Flexbox)
- **SASS & Flexbox Usage:** Employed SASS and flexbox for efficient frontend styling.

## Next Steps

### Implementing Favorites
- **Favorite Locations:** Enable users to save preferred locations.
- **Sort Favorites:** Implement sorting to display favorited locations prominently.
