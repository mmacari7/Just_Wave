import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';

const url = "http://localhost:3000/laguana"

class Laguana extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1>LAGUANA</h1>
                    <p>Hello Friends, this is Laguana :)</p>
                </div>
                <Chat url={url}/>
            </div>
        );
    }
}

export default Laguana;