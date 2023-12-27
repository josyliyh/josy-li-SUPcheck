const knex = require("knex")(require("../knexfile"));

const getAllLocations = async (_req, res) => {
    try {
      const locationsFound = await knex('locations');
      res.status(200).send(locationsFound);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getOneLocation = async (req, res) => {
    try {
      const locationId = req.params.id;
      const locationFound = await knex('locations')
        .select('*')
        .where('id', locationId)
        .first();
  
      if (locationFound) {
        delete locationFound.created_at;
        delete locationFound.updated_at;
        res.status(200).json(locationFound);
      } else {
        res.status(404).json({ error: 'Location not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getAllLocations,
    getOneLocation,
  };