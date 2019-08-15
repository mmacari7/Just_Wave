import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';

const url = "http://localhost:3000/pipeline"

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
                <Chat url={url}/>
            </div>

            
        );
    }
}

export default Pipeline;