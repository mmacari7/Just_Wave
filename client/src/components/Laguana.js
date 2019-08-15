import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';

const url = "http://localhost:3000/laguana"

class Laguana extends Component {
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
                <h1>LAGUANA</h1>
                <p>Hello Friends, this is Laguana :)</p>
            </div>
        );
    }
}

export default Laguana;