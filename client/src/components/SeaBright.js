import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';
import Forecast from './Forecast';

const url = "http://localhost:3000/seabright";
const beachKey = "seabright";

class SeaBright extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <div>
                    <h1 className="centered">Sea Bright, NJ</h1>
                </div>
                <Forecast url={url}/>
                <Chat url={url} beachKey={beachKey}/>
            </div>
        );
    }
}

export default SeaBright;