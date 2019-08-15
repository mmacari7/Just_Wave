import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';
import axios from "axios";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: undefined,
            url: this.props.url, 
            socket: undefined,
            usernameDisabled: false,
            chatDisabled: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        // this.setState({url: this.props.url});
        let socket = io(this.state.url);
        socket.on("connection", () => {
            console.log("Connected to server");
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({usernameDisabled: true})
        console.log(this.state.username);
    }

    handleChange(e){
        this.setState({username: e.target.value})
    }

    render() {
        return (
            <div className="chat-container"> 
                <h2 className="loc-heading">Live Chat</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="username-input">User Name</label>
                        <input type="text" onChange={this.handleChange} className="form-control" disabled={this.state.usernameDisabled} required/>
                        <button type="submit" disabled={this.state.usernameDisabled} className="btn btn-primary">Enter</button>
                    </div>

                </form>

                <div className="container">
                    <div className="chat-box">
                        
                        <div className="message-container">
                            <div className="messageText">
                                <p>Message</p>
                            </div>
                        </div>

                        <div className="message-container">
                            <div className="messageText">
                                <p>Message</p>
                            </div>
                        </div>


                        {/* <div className="message-sender">
                            <form className="form-inline">
                            
                                <input type="text" className="form-control" required/>
                            

                            <input type="submit" value="Send" className="btn btn-primary"/>

                            </form>
                        </div> */}
                        

                    </div>

                    <div className="message-sender">
                        <form className="form-group">
                        
                            <input type="text" placeholder="Enter Message" className="form-control input-lg" disabled={this.state.chatDisabled}/>
                            <input type="submit" value="Send" className="btn btn-primary"/>

                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default Chat;
