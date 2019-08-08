import React, {Component} from "react";
import '../css/index.css'

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chat-container"> 
                <h2 className="loc-heading">Live Chat</h2>
                <div className="container">
                    CHAT HERE
                </div>
            </div>
        );
    }
}

export default Chat;
