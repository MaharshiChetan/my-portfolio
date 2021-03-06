/* ====================
   Import Node Modules
==================== */
const PORT = process.env.PORT || 3000;
const express = require("express"); // Fast, unopinionated, minimalist web framework for node
const app = express(); // Initiate Express Application
const router = express.Router();
const mongoose = require("mongoose"); // Node tool for MongoDB
const config = require("./config/database"); // Mongoose Config
const path = require("path"); // NodeJS Package for file paths
const send = require("./routes/send")(router);
const bodyParser = require("body-parser");
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
   if (err) {
      console.log("Could NOT connect to the database: ", err);
   } else {
      console.log("Connected to the database: " + config.db);
   }
});

app.use(cors({
   origin: 'http://localhost:4200',
}));
// Provide static directory for frontend
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client/dist/"));
app.use(send);

// Connect server to angular index.html
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname + "/client/dist/index.html"));
})

// Start Server: Listen on port 3000
app.listen(PORT, () => console.log(`Listen on port ${PORT}....`));

