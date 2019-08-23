import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';
import Forecast from './Forecast';

const url = "http://localhost:3000/pipeline"
const beachKey = "pipeline";

class Pipeline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1>PIPELINE</h1> 
                    <p>Hello Friends, this is Pipline :)</p>
                </div>
                <Forecast url={url}/>
                <Chat url={url} beachKey={beachKey}/>
            </div>            
        );
    }
}

export default Pipeline;