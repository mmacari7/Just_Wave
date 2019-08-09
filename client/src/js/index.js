// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../css/index.css';
// import App from './App';
// import * as serviceWorker from '../serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// if (module.hot) { module.hot.accept(); }


// console.log("Forecast Received Props: " + props)
// console.log(weather.getdata());


let apiKey = "36fd2ffa1c54bea102544e13a622e3a5";
let city = 'wayne';
let weather = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// module.exports = {
//     async getWeather() {
//         let res = await weather();
//         console.log(res)
//         return res;
//     }
// }