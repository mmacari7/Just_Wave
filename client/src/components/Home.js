import React, {Component} from "react";
import '../css/index.css'

import WeatherIcon from '../../../assets/weather.png';
import ChatIcon from '../../../assets/chat.png';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid jumbotron-main">
                    <div className="container">
                        <h1 className="display-4">Just Wave</h1>
                        <p className="lead">Welcome to Just Wave, your source for surf and weather information at some of America's hottest surf spots. Select a location from the top bar for up-to-date weather reports and to communicate with other local surfers.</p>
                    </div>
                </div>

                <div className="row home-container">
                    <div className="col home-col container">
                        <img className="weather-icon" src={WeatherIcon} alt='Weather icon'/>
                        <h2>Live Weather</h2>
                        <h3>Up-to-the minute reports.</h3>
                        <p>To check the latest weather reports, select a location from the top bar.</p>
                    </div>
                    <div className="col home-col container">
                        <img className="weather-icon" src={ChatIcon} alt='Chat icon'/>
                        <h2>Live Chat</h2>
                        <h3>Communicate with the locals.</h3>
                        <p>Get chatting by selecting a location from the top bar.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
