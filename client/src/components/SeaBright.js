import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';
import Forecast from './Forecast';

const url = "http://localhost:3000/seabright"

class SeaBright extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='container'>
                <div>
                    <h1>SEA BRIGHT</h1>
                    <p>Hello Friends, this is Sea Bright :)</p>
                </div>
                {/* <Forecast url={url}/> */}
                <Chat url={url}/>
            </div>
        );
    }
}

export default SeaBright;