import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';

const url = "http://localhost:3000/oceancity"

class OceanCity extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let socket = io(url);
        socket.on("connection", () => {
            console.log("Connected to server");
        })
    }

    render() {
        return (
            <div>
                <h1>OCEAN CITY</h1>
                <p>Hello Friends, this is Ocean City :)</p>
            </div>
        );
    }
}

export default OceanCity;