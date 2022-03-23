const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "food_db";

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var ProfileRouter = require("./routes/Profile");
var FoodRouter = require("./routes/Food");
var OrderRouter = require("./routes/Order");
var StatisticsRouter = require("./routes/Statistics");

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://db:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/profile", ProfileRouter);
app.use("/food", FoodRouter);
app.use("/order", OrderRouter);
app.use("/statistics", StatisticsRouter);
// app.use("/buyer", BuyerRouter);
// app.use("/vendor", VendorRouter);

app.listen(process.env.PORT || PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
