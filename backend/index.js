const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const createuser = require("./Routes/CreateUser");
const displayData = require("./Routes/DisplayData");
// CORS middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Connect to MongoDB
mongoDB();

// Hello World route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the createUser route
app.use('/api', createuser);
app.use('/api', displayData);

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
