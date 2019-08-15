import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';
// import {ThemeProvider} from '@livechat/ui-kit';

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
            <div className='container'>
                <div>
                    <h1>SEA BRIGHT</h1>
                    <p>Hello Friends, this is Sea Bright :)</p>
                </div>

                <form>
                    <div className='form-group'>
                        <label htmlFor="username-input">User Name</label>
                        <input type="text" className="form-control" required/>
                    </div>
                </form>



            </div>
        );
    }
}

export default SeaBright;