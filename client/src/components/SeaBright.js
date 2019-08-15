import React, {Component} from "react";
import '../css/index.css'

import Chat from './Chat';

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

                <Chat url={url}/>

                
            </div>
        );
    }
}

export default SeaBright;