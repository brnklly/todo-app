const express = require('express');
const connectDB = require('./config/db.js');

// App
const app = express();

// Connect to mongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('api/users/', require('./routes/api/users'));

// Port setup
const PORT = 5000; // offers flexibility for services like heroku
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
