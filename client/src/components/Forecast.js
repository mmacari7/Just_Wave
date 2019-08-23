import React, {Component} from "react";
import '../css/index.css'

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
            temp: '',
            pressure: '',
            wind: '',
            cloudcover: '',
            high: '',
            low: ''
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
                temp: json.main.temp,
                pressure: json.main.pressure,
                high: json.main.temp_max,
                low: json.main.temp_min,
                // wind: json.main.wind
                // wind: json.main.wind.speed,
                // cloudcover: json.main.clouds
            });

            let curTemp = parseInt((parseInt(this.state.temp) - 273) * (9/5) + 32);
            let highTemp = parseInt((parseInt(this.state.high) - 273) * (9/5) + 32);
            let lowTemp = parseInt((parseInt(this.state.low) - 273) * (9/5) + 32);
            // let windSpeed = String(this.state.wind.speed)
            this.setState({ temp: curTemp, high: highTemp, low: lowTemp })
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
                        <h3 className="centered">{ this.state.temp }&deg; F</h3>
                        <h3 className="centered">{ this.state.overview }</h3>
                        <p className="centered">High: { this.state.high }&deg; F &nbsp; &nbsp; &nbsp; &nbsp; Low: { this.state.low }&deg; F</p>
                        {/* <p className="centered">Wind Speed: { this.state.wind }</p> */}
                        {/* Cloud Cover: { this.state.cloudcover.all } */}
                        {/* Wind Speed: { this.state.wind.speed } */}
                        {/* Wind Direction: { this.state.wind.direction } */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Forecast;
