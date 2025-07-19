const express = require('express');
const app = express();
require('dotenv').config()

const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT ||3000;


// Root route
app.get('/', (req, res) => {
  res.send("Hello! Welcome to my channel.");
});


const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')

app.use('/person', personRoutes)
app.use('/menuitem', menuRoutes)


// Start server

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
