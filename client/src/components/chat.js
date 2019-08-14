import React, {Component} from "react";
import '../css/index.css'
import '../js/script'


class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div className="chat-container">
                <h2 className="loc-heading">Live Chat</h2>
                <div className="container">
                    <div className="chat-box" id="posts">

                    </div>
                    <div>
                        <form id="searchForm" className="search-form">
                            <div className="field-area">
                                <label htmlFor="username">Username</label>
                                <input className="input" type="text" name="username" id="username" placeholder="Enter a username." />
                            </div>
                            <div className="field-area">
                                <label htmlFor="message">Message</label>
                                <input className="input" type="text" name="message" id="message" placeholder="Enter a message." />
                            </div>
                            <button className="button go-button" type="submit"> Go </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
