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
            url: this.props.url,
            data: {},
            temp: '',
            pressure: ''
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

    async componentDidMount() {
        try {
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=5104493&appid=36fd2ffa1c54bea102544e13a622e3a5');
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            this.setState(
                { 
                    data: json, 
                    overview: json.weather.main,
                    temp: json.main.temp, 
                    pressure: json.main.pressure
                    // windspeed: json.main.wind.speed,
                    // winddirect: json.main.wind.deg,
                    // cloudcover: json.main.clouds.all,
                });
        } catch (error) {
            console.log(error);
        }

		// .then(res => res.json())
		// .then(data => {
		// 	if(this.state.data.data.cod === '404') {
		// 		this.setState({
		// 			isLoading: false,
		// 			cityNotFound: '404'
		// 		})
		// 	} else {
		// 	   // Determine weather icon
		// 	//    let weatherId = data.data.weather[0].id;

		// 	//    if(weatherId <= 232) {
		// 	//         this.setState({ weatherIcon: ThunderStormIcon })
		// 	//    } else if(weatherId >= 300 && weatherId <= 531) {
		// 	//         this.setState({ weatherIcon: RainIcon });
		// 	//    } else if(weatherId >= 600 && weatherId <= 622 ) {
		// 	//         this.setState({ weatherIcon: SnowIcon });
		// 	//    } else if(weatherId === 800) {
		// 	//         this.setState({ weatherIcon: ClearIcon });
		// 	//    } else if(weatherId >= 801 && weatherId <= 804) {
		// 	//         this.setState({ weatherIcon: CloudsIcon });
		// 	//    }
		// 	     this.setState({
		// 	        isLoading: false,
		// 	        currentTemp: Math.round(data.data.main.temp) + '°',
		// 	        humidity: data.data.main.humidity + '%',
		// 	        wind: Math.round(data.data.wind.speed) + ' mph',
		// 	        windDirection: data.data.wind.deg,
		// 	        currentCondition: data.data.weather[0].main,
		// 	        currentConditionDescription: data.data.weather[0].description,
		// 	        cityName: data.data.name
		// 	     });
		// 	}
	
		// .catch(err => {
		//    console.log(err);
		// })	
    }
    

    render() {

        if (!this.state.data) {
            return <div />
        }
 
        // const WeatherCardError = (
        //     <div className='weatherCardContainer'>
        //       <div className='weatherCardError'>
        //          {/* <img src={NoLocationFound} alt='no location found'/> */}
        //             <p> Whoa! Looks like there was an error with your zipcode.</p>
        //          {/* <Link to='/'><button>Try Again</button></Link> */}
        //       </div>
        //     </div>
        //  )
 
        //  const WeatherConditions = (
        //      this.state.cityNotFound == 404 ? <div> { WeatherCardError } </div> :
        //      <div>
        //         <div className='homeBtn'>
        //               {/* <Link to='/'><button>Home</button></Link> */}
        //         </div>
        //         <div className='weatherCardContainer'>
        //            <div className='weatherCard'>
        //          {/* <img src={this.state.weatherIcon} alt='Weather icon'/> */}
        //             <div className='conditionsOverview'>
        //                <p>{this.state.currentTemp}</p>
        //                <p>{this.state.currentConditionDescription}</p>
        //             </div>
        //             <div className='conditionDetails'>
        //                <p>Humidity: {this.state.humidity} </p>
        //                <p>Wind Speed: {this.state.wind} </p>
        //             </div>
        //            </div> 
        //           <h4> Location | {this.state.cityName} </h4>
        //         </div>
        //      </div>
        //  )
 
        //  const LoadingDisplay = (
        //     <div className='loading'>
        //        {/* <img className='loadingIcon' src={LoadingIcon} alt='loading icon'/> */}
        //        LOADING
        //     </div>
        //  )

        //  const CurrentWeatherCard = ( 
        //     this.state.currentTemp === true ? <div> {LoadingDisplay} </div> : <div> {WeatherConditions} </div>
        //  )

        return (
            <div className="container forecast-container">
                <div className="container">
                    <div>
                    {/* { CurrentWeatherCard } */}
                    { this.state.data.base }
                    
                    { this.state.pressure }
                    </div>
                    <div className="row">
                        <div className="col-sm fc-item">
                            <div className="row">
                                <img src="..." alt="img" width="200" height="150"/>
                                { this.state.temp }
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
                    </div>
                </div>
            </div>
        );
    }
}

export default Forecast;
