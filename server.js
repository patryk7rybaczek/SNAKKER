const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');

const PORT = 4000;
const app = express();

// Middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })  
);

app.use(bodyParser.json());

// Database Configuration
const db = require('./config/keys').mongoURI;

// Database Connection
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log('Successfully conntected to MongoDB'))
    .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Configuration
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));