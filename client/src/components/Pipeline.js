import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';
import Forecast from './Forecast';

const url = "http://localhost:3000/pipeline"

class Pipeline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="centered">Pipeline, HI</h1> 
                </div>
                <Forecast url={url}/>
                <Chat url={url}/>
            </div>

            
        );
    }
}

export default Pipeline;