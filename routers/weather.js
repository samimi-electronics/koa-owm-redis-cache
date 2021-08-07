const Router = require('koa-router');
const ResultHelper = require("../helpers/resultHelper");
const axios = require('axios').default;
const { owmApiKey } = require('../config/config');

const { getDataDb, setDataDb } = require('../db/db');

const router = new Router({
    prefix: '/weather'
});

// Dummy data
let weatherData = [
    {
        "coord": {
            "lon": 51.4215,
            "lat": 35.6944
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 291,
            "feels_like": 286.57,
            "temp_min": 290.15,
            "temp_max": 292.15,
            "pressure": 1022,
            "humidity": 15
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.06,
            "deg": 150
        },
        "clouds": {
            "all": 0
        },
        "dt": 1617109870,
        "sys": {
            "type": 1,
            "id": 7464,
            "country": "IR",
            "sunrise": 1617071018,
            "sunset": 1617116020
        },
        "timezone": 16200,
        "id": 112931,
        "name": "Tehran",
        "cod": 200
    },
];

// Dummy endpoint
router.get('/', (ctx, next) =>{
    ctx.body = weatherData;
    next();
});

// TODO: Handle spaces in name. e.g new york does not work with curl
router.get('/city/:cityName', async (ctx, next) => {
    const { cityName } = ctx.params;
    // Get data from redis cache
    const dataFromDb = await getDataDb(cityName);
    if (dataFromDb === null) { // redis cache is clear
        console.log('Data not available on cache');
        let owmResponse;
        // try to get data from
        try {
            owmResponse =
                await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${owmApiKey}`);
            if (owmResponse.data) {
                ctx.body = ResultHelper.resultSuccess(owmResponse.data);
                const owmResponseDataJson = JSON.stringify(owmResponse.data);
                await setDataDb(cityName, owmResponseDataJson, 'EX', 60 * 60 * 1); // 60 seconds * 60 * n = n hour
            }
        } catch (err) {
            ctx.body = ResultHelper.resultError(err.message);
        }
    } else {
        console.log('Data from cache');
        ctx.body = ResultHelper.resultSuccess(JSON.parse(dataFromDb));
    }
    next();
});

router.get('/onecall', async (ctx, next) => {
    const { lat, lon } = ctx.query;
    console.log(lat, lon);
    const redisKey = lat + lon;
    // Get data from redis cache
    const dataFromDb = await getDataDb(redisKey);
    if (dataFromDb === null) { // redis cache is clear
        console.log('Data not available on cache');
        let owmResponse;
        // try to get data from
        try {
            console.log(owmApiKey);
            owmResponse =
                await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${owmApiKey}`);
            if (owmResponse.data) {
                ctx.body = ResultHelper.resultSuccess(owmResponse.data);
                const owmResponseDataJson = JSON.stringify(owmResponse.data);
                await setDataDb(redisKey, owmResponseDataJson, 'EX', 60 * 60 * 1); // 60 seconds * 60 * n = n hour
            }
        } catch (err) {
            ctx.body = ResultHelper.resultError(err.message);
        }
    } else {
        console.log('Data from cache');
        ctx.body = ResultHelper.resultSuccess(JSON.parse(dataFromDb));
    }
    next();
});

module.exports = router;
