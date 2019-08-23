import React, {Component} from "react";
// const weather = require('../../../worker/weather');

import '../css/index.css'

//Assets
// import ThunderStormIcon from './assets/weather_icons/01W.svg';
// import RainIcon from './assets/weather_icons/02W.svg';
// import SnowIcon from './assets/weather_icons/03W.svg';
// import ClearIcon from './assets/weather_icons/04W-DAY.svg';
// import CloudsIcon from './assets/weather_icons/05W.svg';
// import NoLocationFound from './assets/no-location.svg';
// import LoadingIcon from './assets/loading.svg';

// const bodyParser = require('body-parser');
// const express = require('express');

// const nrp = require('../../../redis/nrp-sender-shim');
// const redisConnection = require('../../../redis/redis-connection');

// const app = express();
// app.use(bodyParser.json());

// func getWeather(), async {
//     try {
//         console.log("GET server")
//         let response = await nrp.sendMessage({
//             redis: redisConnection,
//             eventName: 'get',
//             data: { id: req.params.id },
//             expectsResponse: true
//         });
//         console.log(response)
//         res.json(response);
        
//     } 
//     catch (e) {
//         if (e.errorCode) {
//             res.status(e.errorCode).json({ error: e.message });
//             console.log("server" + e)
//         } 
//         else {
//             res.status(504).json({ error: e.message });
//             console.log("server" + e)
//         }
//     }
// });

class Forecast extends Component {
    constructor(props) {
        super(props);

        let cityId = '';
        if (props.url == 'http://localhost:3000/laguana') {
            cityId = '4483525';
        }
        else if (props.url == 'http://localhost:3000/seabright') {
            cityId = '5104493';
        }
        else if (props.url == 'http://localhost:3000/newport') {
            cityId = '5376890';
        }
        else if (props.url == 'http://localhost:3000/oceancity') {
            cityId = '4364312';
        }
        else if (props.url == 'http://localhost:3000/pipeline') {
            cityId = '5855420';
        }
        else {
            cityId = '0'
        }

        this.state = ({
            
            // isLoading: true,
            currentTemp: '79F',
            // humidity: '',
            // wind: '',
            // windDirection: '',
            // currentCondition: '',
            // currentConditionDescription: '',
            // weatherIcon: '',
            // cityName: '',
            // cityNotFound: '',
            cityId: cityId,
            data: {},
            overview: '',
            temp: '',
            pressure: '',
            wind: '',
            cloudcover: '',
            high: '',
            low: '',
        })

        // OPENWEATHER API Response Schema Example
        // {
        //     "coord": {"lon":138.6,"lat":-34.93},
        //     "weather":[
        //         {"id":803,
        //         "main":"Clouds",
        //         "description":"broken clouds",
        //         "icon":"04n"}
        //     ],
        //     "base":"stations",
        //     "main":{
        //         "temp":284.51,
        //         "pressure":1027,
        //         "humidity":87,
        //         "temp_min":282.59,
        //         "temp_max":285.93},
        //         "wind":{"speed":5.46,"deg":260.351},
        //         "rain":{"3h":0.063},
        //         "clouds":{"all":75},
        //         "dt":1566319899,
        //         "sys":{"type":3,"id":2001119,"message":0.0067,"country":"AU","sunrise":1566336004,"sunset":1566375490},
        //         "timezone":34200,
        //         "id":2078025,
        //         "name":"Adelaide",
        //         "cod":200
        //     }
    }


    // location ids 
    // ocean city, md -> 4364312
    // newport beach, ca -> 5376890
    // pipeline, hi -> 5855420
    // laguna beach, ca -> 4483525
    // sea bright, nj -> 5104493

    convertTemp(tempStr) {
        let temp = String(tempStr);
        return temp;
    }
    async componentDidMount() {
        try {                                                           // .../weather?id=[ID]...
            let dataUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + this.state.cityId + '&appid=36fd2ffa1c54bea102544e13a622e3a5';
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();

            let fTemp = String(json.main.temp);

            this.setState(
                { 
                    data: json, 
                    overview: json.weather[0].main,
                    temp: fTemp,
                    pressure: json.main.pressure,
                    high: json.main.temp_max,
                    low: json.main.temp_min
                    // wind: json.main.wind.speed,
                    // cloudcover: json.main.clouds
                });
        } 
        catch (error) {
            console.log(error);
        }

    }
    

    render() {

        if (!this.state.data) {
            return <div />
        }
 
        return (
            <div className="container forecast-container">
                <div className="container">
                    <div>
                        <h3 className="centered">{ this.state.temp } K</h3>
                        <h3 className="centered">{ this.state.overview }</h3>
                        <h4 className="centered">High: { this.state.high } K &nbsp; &nbsp; &nbsp; &nbsp; Low: { this.state.low } K</h4>
                        {/* Cloud Cover: { this.state.cloudcover.all } */}
                        {/* Wind Speed: { this.state.wind.speed } */}
                        {/* Wind Direction: { this.state.wind.direction } */}

                   
                    </div>
                    {/* <div className="row">
                        <div className="col-sm fc-item">
                            <div className="row">
                                <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Temperature</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                        <div className="row">
                        <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Cloud Cover</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Chance of Precip</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm fc-item">
                            <div className="row">
                                <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Depth of Sea Floor</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                        <div className="row">
                        <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Tides</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Human Concentration</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Breakpoints</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default Forecast;
