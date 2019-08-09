// const axios = require('axios');
// const redisConnection = require('../redis/redis-connection');

// // const key = '13179207-9504699ee78c4418c1566b582';
// // const weather = axios.create({ baseURL: 'http://api.openweathermap.org/data/2.5/find?q=Palo+Alto&units=imperial&type=accurate&mode=xml&APPID=api-key', timeout: 5000 });

// let apiKey = "36fd2ffa1c54bea102544e13a622e3a5";
// let city = 'wayne';
// let weather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// redisConnection.on('weather:request:*', async msg => {
//     let requestId = msg.requestId;
//     let eventName = msg.eventName;

//     let successEvent = `${eventName}:success:${requestId}`;
//     let failedEvent = `${eventName}:failed:${requestId}`;

//     try {
//         const { data } = await weather({
//             params: {
//                 key: key,
//                 q: msg.data.query,
//                 safesearch: true,
//                 per_page: 5
//             }
//         });
        
//         redisConnection.emit(successEvent, { requestId: requestId, data: data, eventName: eventName });
//     } 
//     catch (e) {
//         const error = e.toString() || 'Error: Request failed.';
//         redisConnection.emit(failedEvent, { requestId: requestId, data: { message: error, errorCode: 500 }, eventName: eventName });
//     }
// });

var weather = require('openweather-apis');


weather.setLang('en');

// set city by name
// weather.setCity('Fairplay');
// or set the coordinates (latitude,longitude)
// weather.setCoordinate(50.0467656, 20.0048731);
// or set city by ID (recommended by OpenWeatherMap)
weather.setCityId(4367872);

// or set zip code
// weather.setZipCode(33615);

// 'metric'  'internal'  'imperial'
weather.setUnits('imperial');

// check http://openweathermap.org/appid#get for get the APPID
weather.setAPPID('36fd2ffa1c54bea102544e13a622e3a5');

weather.getTemperature(function(err, temp){
    console.log(temp);
});

module.exports = weather;