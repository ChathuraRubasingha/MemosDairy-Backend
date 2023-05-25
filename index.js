const express = require("express");
const mongoose = require("mongoose");
const ConnectDB = require("./database/connection");
const routes = require("./routes/routes");
const bodyParser = require('body-parser');
const Cors = require('cors')


const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(Cors())

ConnectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
