/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  await knex('locations').del();
  
  await knex('locations').insert([
    {
      id: 1,
      name: 'Jericho Beach',
      address: '3941 Point Grey Rd, Vancouver, BC V6R 1B3',
      city: 'Vancouver',
      Latitude: 49.2711,
      Longitude: -123.1969,
      Rental: false,
      DayPass: false
    },
    {
      id: 2,
      name: 'English Bay',
      address: '1700 Beach Ave, Vancouver, BC V6E 1V3',
      city: 'Vancouver',
      Latitude: 49.2860,
      Longitude: -123.1404,
      Rental: false,
      DayPass: false
    },
    {
      id: 3,
      name: 'Rocky Point Park',
      address: '2800 Murray St, Port Moody, BC V3H 1X2',
      city: 'Port Moody',
      Latitude: 49.2869,
      Longitude: -122.8656,
      Rental: false,
      DayPass: false
    },
    {
      id: 4,
      name: 'Kitsilano Beach',
      address: '1499 Arbutus St, Vancouver, BC V6J 5N2',
      city: 'Vancouver',
      Latitude: 49.2764,
      Longitude: -123.1550,
      Rental: false,
      DayPass: false
    },
    {
      id: 5,
      name: 'Stanley Park Seawall',
      address: 'Vancouver', // Placeholder address
      city: 'Vancouver',
      Latitude: 49.3032,
      Longitude: -123.1436,
      Rental: false,
      DayPass: false
    },
    {
      id: 6,
      name: 'Granville Island',
      address: '1669 Johnston St, Vancouver, BC V6H 3S2',
      city: 'Vancouver',
      Latitude: 49.2714,
      Longitude: -123.1337,
      Rental: false,
      DayPass: false
    },
    {
      id: 7,
      name: 'Buntzen Lake',
      address: 'Village of Anmore, BC', // Placeholder address
      city: 'Anmore',
      Latitude: 49.3506,
      Longitude: -122.8598,
      Rental: false,
      DayPass: false
    },
    {
      id: 8,
      name: 'Ambleside Beach',
      address: '1150 Marine Dr, West Vancouver, BC V7T 1B1',
      city: 'West Vancouver',
      Latitude: 49.3270,
      Longitude: -123.1551,
      Rental: false,
      DayPass: false
    },
    {
      id: 9,
      name: 'Spanish Banks Beach',
      address: '4801 NW Marine Dr, Vancouver, BC V6T 1A1',
      city: 'Vancouver',
      Latitude: 49.2770,
      Longitude: -123.2265,
      Rental: false,
      DayPass: false
    },
    {
      id: 10,
      name: 'Second Beach',
      address: '7501 Stanley Park Dr, Vancouver, BC V6G 3E2',
      city: 'Vancouver',
      Latitude: 49.2901,
      Longitude: -123.1425,
      Rental: false,
      DayPass: false
    },
    {
      id: 11,
      name: 'Third Beach',
      address: 'Stanley Park Seawall', // Placeholder address
      city: 'Vancouver',
      Latitude: 49.2948,
      Longitude: -123.1489,
      Rental: false,
      DayPass: false
    },
    {
      id: 12,
      name: 'Sasamat Lake',
      address: 'White Pine Beach Rd, Belcarra, BC V3H 4P6',
      city: 'Belcarra',
      Latitude: 49.3461,
      Longitude: -122.9181,
      Rental: false,
      DayPass: false
    },
    {
      id: 13,
      name: 'Port Moody Inlet',
      address: 'Port Moody, BC', // Placeholder address
      city: 'Port Moody',
      Latitude: 49.2921,
      Longitude: -122.8376,
      Rental: false,
      DayPass: false
    },
    {
      id: 14,
      name: 'White Pine Beach',
      address: 'Port Moody, BC', // Placeholder address
      city: 'Port Moody',
      Latitude: 49.2996,
      Longitude: -122.8664,
      Rental: false,
      DayPass: false
    },
    {
      id: 15,
      name: 'Deep Cove',
      address: 'North Vancouver, BC', // Placeholder address
      city: 'North Vancouver',
      Latitude: 49.3266,
      Longitude: -122.9474,
      Rental: false,
      DayPass: false
    }
  ]);
};

