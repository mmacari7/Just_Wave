import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';
import Forecast from './Forecast';

const url = "http://localhost:3000/oceancity"
const beachKey = "oceancity";

class OceanCity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1>OCEAN CITY</h1>
                    <p>Hello Friends, this is Ocean City :)</p>
                </div>
                <Forecast url={url}/>
                <Chat url={url} beachKey={beachKey}/>
            </div>
        );
    }
}

export default OceanCity;