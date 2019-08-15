import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';

const url = "http://localhost:3000/newport"

class NewPort extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1>NEWPORT</h1>
                    <p>Hello Friends, this is New Port :)</p>
                </div>
                <Chat url={url}/>
            </div>
        );
    }
}

export default NewPort;