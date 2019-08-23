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
            username: "",
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

        let un = await axios.get("/api/get-username");

        // If user has a cookie for their username, we set the state back to their previous UN
        if(un.data.username){
            this.setState({username: un.data.username, usernameDisabled: true, chatDisabled: false})
        }

        // Sets the initial messages state from Redis cache on server
        this.setState({receivedMessages: res.data.messagesForClient});
        this.scrollToBottom();

        // Socket message from client
        this.state.socket.on('client-message', (obj) => {
            // Set the state based on message from server
            this.setState(prevState => ({
                receivedMessages: [...prevState.receivedMessages, {datetime: obj.datetime, username: obj.username, message: obj.message}]
            }))
            this.scrollToBottom();
        })
    }

    // Handles submission of username
    async handleUsernameSubmit(e){
        e.preventDefault();
        this.setState({usernameDisabled: true, chatDisabled: false})

        // Sets the username in the session cookie for returning visitors
        let res = await axios.post('/api/set-username', {username: this.state.username});

        console.log(res.data.message);

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
            receivedMessages: [...prevState.receivedMessages, {datetime: dt, username: this.state.username, message: this.state.message}]
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
                        <input type="text" className="form-control" disabled={this.state.usernameDisabled} value={this.state.username} onChange={this.handleUsernameChange} required/>
                        <button type="submit" disabled={this.state.usernameDisabled} className="btn btn-primary">Enter</button>
                    </div>
                </form>

                <div className="container">
                    <div className="chat-box" id="c-box">
                        
                        {this.state.receivedMessages.map((el, i) => {
                            // If the message is from another
                            if(el.username !== this.state.username){
                                return(
                                    <div className="message-receive-container" key={i}>
                                        <div className="message-receive-text">
                                            <b id="undisp">{el.username} </b>
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
                                            <b id="undisp">You</b>
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