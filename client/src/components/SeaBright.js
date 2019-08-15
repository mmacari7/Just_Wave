import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';

const url = "http://localhost:3000/seabright"

class SeaBright extends Component {
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
                <h1>SEA BRIGHT</h1>
                <p>Hello Friends, this is Sea Bright :)</p>
            </div>
        );
    }
}

export default SeaBright;