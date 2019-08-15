// const axios = require('axios');
// const redisConnection = require('../redis/redis-connection');

// let apiKey = "36fd2ffa1c54bea102544e13a622e3a5";
// let city = '5042';
// let weather = axios.create({ baseURL: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, timeout: 5000 });


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



// var weather = require('openweather-apis');

// weather.setLang('en');
// weather.setCityId(4367872);
// weather.setUnits('imperial');

// // check http://openweathermap.org/appid#get for get the APPID
// weather.setAPPID('36fd2ffa1c54bea102544e13a622e3a5');

// weather.getTemperature(function(err, temp){
//     console.log(temp);
// });

// module.exports = weather;