require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const Toys = require("./models/toys");
const connectToDB = require("./config/connectToDB");
const toysRoutes = require("./routes/toysRoutes"); 
const categoriesRoutes = require('./routes/categoriesRoutes'); // New
const errorMiddleware = require('./middlewares/errorMiddleware');
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));

// Middleware to parse JSON data
app.use(bodyParser.json());

// // Set view engine
 app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.send("Hi Welcome to our ToyStvxcvore!");
});

app.use('/', toysRoutes); 
app.use('/', categoriesRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Connected to Server from PORT ${PORT}`);
});