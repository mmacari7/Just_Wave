import React, {Component} from "react";
import '../css/index.css'

import RainIcon from '../../../assets/rain.png';
import SnowIcon from '../../../assets/snow.png';
import HazeIcon from '../../../assets/hazy.png';
import ClearIcon from '../../../assets/sunny.png';
import CloudsIcon from '../../../assets/cloudy.png';
import MostlyCloudyIcon from '../../../assets/mostlycloudy.png';
import PartlyCloudyIcon from '../../../assets/partlycloudy.png';
import CloudyIcon from '../../../assets/cloudy.png';
import ThunderStormIcon from '../../../assets/thunderstorm.png';


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
            cityId: cityId,
            data: {},
            overview: '',
            description: '',
            temp: '',
            pressure: '',
            wind: '',
            cloudcover: '',
            high: '',
            low: '',
            code: '',
        })

    }

    async componentDidMount() {
        try {                                                           // .../weather?id=[ID]...
            let dataUrl = 'http://api.openweathermap.org/data/2.5/weather?id=' + this.state.cityId + '&appid=36fd2ffa1c54bea102544e13a622e3a5';
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();

            this.setState({ 
                data: json, 
                overview: json.weather[0].main,
                description: json.weather[0].description,
                temp: json.main.temp,
                pressure: json.main.pressure,
                high: json.main.temp_max,
                low: json.main.temp_min,
                code: json.weather[0].id
                // wind: json.main.wind
                // wind: json.main.wind.speed,
                // cloudcover: json.main.clouds
            });

            let curTemp = parseInt((parseInt(this.state.temp) - 273) * (9/5) + 32);
            let highTemp = parseInt((parseInt(this.state.high) - 273) * (9/5) + 32);
            let lowTemp = parseInt((parseInt(this.state.low) - 273) * (9/5) + 32);
            let descr = this.state.description.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            // let windSpeed = String(this.state.wind.speed)
            if (descr == this.state.overview) {
                descr = '';
            }
            this.setState({ temp: curTemp, high: highTemp, low: lowTemp, description: descr })


            let weatherId = this.state.code;

            if(weatherId <= 232) {
                this.setState({ weatherIcon: ThunderStormIcon })
            } 
            else if(weatherId >= 300 && weatherId <= 531) {
                this.setState({ weatherIcon: RainIcon });
            } 
            else if(weatherId >= 600 && weatherId <= 622 ) {
                this.setState({ weatherIcon: SnowIcon });
            } 
            else if(weatherId >= 700 && weatherId < 800 ) {
                this.setState({ weatherIcon: HazeIcon });
            } 
            else if(weatherId === 800) {
                this.setState({ weatherIcon: ClearIcon });
            } 
            else if(weatherId >= 801 && weatherId <= 802) {
                this.setState({ weatherIcon: PartlyCloudyIcon });
            }
            else if(weatherId === 803) {
                this.setState({ weatherIcon: MostlyCloudyIcon });
            } 
            else if(weatherId === 804) {
                this.setState({ weatherIcon: CloudyIcon });
            } 
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    render() {
        return (
            <div className="container forecast-container">
                <div className="container">
                    <div>
                        <img className="weather-icon" src={this.state.weatherIcon} alt='Weather icon'/>
                        <h3 className="centered cur-weather">{ this.state.temp }&deg; F</h3>
                        <h3 className="centered cur-weather">{ this.state.overview }</h3>
                        <h4 className="centered">{ this.state.description }</h4>
                        <p className="centered">High: { this.state.high }&deg; F &nbsp; &nbsp; &nbsp; &nbsp; Low: { this.state.low }&deg; F</p>

                    </div>
                </div>
            </div>
        );
    }
}

export default Forecast;
