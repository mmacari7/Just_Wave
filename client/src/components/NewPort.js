import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';

const url = "http://localhost:3000/newport"

class NewPort extends Component {
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
                <h1>NEWPORT</h1>
                <p>Hello Friends, this is New Port :)</p>
            </div>
        );
    }
}

export default NewPort;