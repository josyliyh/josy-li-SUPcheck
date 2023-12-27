const knex = require("knex")(require("./knexfile"));
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080
const locationsRoutes = require('./routes/locations-routes');

app.use(cors());
app.use(express.json());

app.use("/", locationsRoutes);


app.listen(PORT, () => {
  console.log("running on 8080");
});