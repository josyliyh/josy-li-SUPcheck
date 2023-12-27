const knex = require("knex")(require("./knexfile"));
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080
const locationRoutes = require('./routes/location-routes')

app.use(cors());
app.use(express.json());

app.use("/locations", locationsRoutes)



app.listen(PORT, () => {
  console.log("running on 8080");
});