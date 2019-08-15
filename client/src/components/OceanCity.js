import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';

const url = "http://localhost:3000/oceancity"

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
                <Chat url={url}/>
            </div>
        );
    }
}

export default OceanCity;