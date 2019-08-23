import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';
import {animateScroll} from "react-scroll";
import axios from "axios";

Date.prototype.today = function() {
    return((this.getDate() < 10)?"0":"") + this.getDate() + "-" + (((this.getMonth() +1) < 10)?"0":"") + (this.getMonth()+1) + "-" + this.getFullYear();
}

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds() + "." + this.getMilliseconds();
}

class Chat extends Component {
    constructor(props) {
        super(props);

        // State for the component
        this.state = {
            username: undefined,
            url: this.props.url,
            beachKey: this.props.beachKey,
            socket: io(this.props.url),
            usernameDisabled: false,
            chatDisabled: true,
            message: "",
            receivedMessages: []
        }

        // Bind our functions
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    async componentDidMount() {

        // Load the cached conversation for socket with call to api
        let res = await axios.get("/api/get-conversation", {params: {key: this.state.beachKey}});

        // Sets the initial messages state from Redis cache on server
        this.setState({receivedMessages: res.data.messagesForClient});
        this.scrollToBottom();

        // Socket message from client
        this.state.socket.on('client-message', (obj) => {
            // Set the state based on message from server
            this.setState(prevState => ({
                receivedMessages: [...prevState.receivedMessages, {datetime: obj.datetime, fromClient: obj.fromClient, username: obj.username, message: obj.message}]
            }))
            this.scrollToBottom();
        })
    }

    // Handles submission of username
    handleUsernameSubmit(e){
        e.preventDefault();
        this.setState({usernameDisabled: true, chatDisabled: false})
    }

    // Changes the state based on current username input
    handleUsernameChange(e){
        this.setState({username: e.target.value})
    }

    // Handles messages being sent
    handleSendMessage(e){
        e.preventDefault();

        // Get current date and time
        let newDate = new Date();
        let dt = newDate.today() + " " + newDate.timeNow();

        // Emit message to server
        this.state.socket.emit('server-message', {datetime: dt, username: this.state.username, message: this.state.message})

        // Set self message in state
        this.setState(prevState => ({
            receivedMessages: [...prevState.receivedMessages, {datetime: dt, fromClient: false, username: "You", message: this.state.message}]
        }))

        // Change message back to empty string
        this.setState({message: ""}, this.scrollToBottom);
    }

    // Handles changing the message input field to send
    handleMessageChange(e){
        this.setState({message: e.target.value});
    }

    // Fancy scroll
    scrollToBottom(){
        animateScroll.scrollToBottom({
            containerId: "c-box"
        });
    }

    render() {
        return (
            <div className="chat-container"> 
                <h2 className="loc-heading">Live Chat</h2>

                <form onSubmit={this.handleUsernameSubmit}>
                    <div className='form-group'>
                        <label htmlFor="username-input">Temp User Name</label>
                        <input type="text" onChange={this.handleUsernameChange} className="form-control" disabled={this.state.usernameDisabled} required/>
                        <button type="submit" disabled={this.state.usernameDisabled} className="btn btn-primary">Enter</button>
                    </div>
                </form>

                <div className="container">
                    <div className="chat-box" id="c-box">
                        
                        {this.state.receivedMessages.map((el, i) => {
                            // If the message is from another
                            if(el.fromClient){
                                return(
                                    <div className="message-receive-container" key={i}>
                                        <div className="message-receive-text">
                                            <b>{el.username} </b>
                                            <p id="cmes">{el.message}</p>
                                            <sub id="dt">{el.datetime.slice(0,-4)}</sub>
                                        </div>
                                    </div>
                                )
                            }
                            // If message is from self
                            else{
                                return(
                                    <div className="message-sent-container" key={i}>
                                        <div className="message-sent-text">
                                            <b>{el.username}</b>
                                            <p id="cmes">{el.message}</p>
                                            <sub id="dt">{el.datetime.slice(0,-4)}</sub>
                                        </div>
                                    </div>
                                )
                            }
                        })}

                    </div>

                    <div className="message-sender">
                        <form className="form-group" onSubmit={this.handleSendMessage}>
                        
                            <input type="text" placeholder="Enter Message" className="form-control input-lg" disabled={this.state.chatDisabled} value={this.state.message} onChange={this.handleMessageChange} required/>
                            <input type="submit" disabled={this.state.chatDisabled} value="Send" className="btn btn-primary"/>

                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default Chat;