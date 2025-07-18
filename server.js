const express = require('express');
const app = express();
const db = require('./db'); // Assuming your db.js handles Mongoose connection
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send("Hello! Welcome to my channel.");
});



const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')

app.use('/person', personRoutes)
app.use('/menuitem', menuRoutes )


// Start server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
