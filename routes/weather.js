const router = require('express').Router();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));;
require('dotenv').config()

router.get('/', (req, res) => {
    res.render('index', {
      city: null,
      des: null,
      icon: null,
      temp: null
    });
});

router.post('/', async (req, res) => {
    const city = req.body.city

    const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    try {
      await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if(data.message === 'city not found') {
          res.render('index', {
            city: data.message,
            des: null,
            icon: null,
            temp: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = Math.floor((data.main.temp - 273.15) * 1.8 + 32);

          res.render('index', {
            city, des, icon, temp
          });
        }
      });


    } catch (err){
      res.render('index', {
        city: "Oops, that didn't work",
        des: null,
        icon: null,
        temp: null
      })
    }

})

module.exports = router;