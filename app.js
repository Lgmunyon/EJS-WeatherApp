const express = require('express');
const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

//Import Route
const weatherRoute = require('./routes/weather');

//Use View Engine
app.set('view engine', 'ejs');

//Middleware Route
app.use('/', weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}, you better go catch it.`));

