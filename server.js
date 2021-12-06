const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');
const cors = require('cors');
const DB_URL = "mongodb+srv://tanLoi:admin123@comp3123.xrhj9.mongodb.net/101094358_assignment2?retryWrites=true&w=majority"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Assignment 02</h1>");
});

app.use(employeeRouter);
app.listen(9090, () => {
    console.log("Server is listening on port 9090");
});