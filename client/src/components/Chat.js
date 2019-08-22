import React, {Component} from "react";
import '../css/index.css'
import io from 'socket.io-client';
import {animateScroll} from "react-scroll";

class Chat extends Component {
    constructor(props) {
        super(props);

        // State for the component
        this.state = {
            username: undefined,
            url: this.props.url, 
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

    componentDidMount() {
        // this.setState({url: this.props.url});
        // let socket = io(this.state.url);
        this.state.socket.on("connection", () => {
            console.log("Connected to server");
        })

        this.scrollToBottom();

        // Socket message from client
        this.state.socket.on('client-message', (obj) => {

            // Set the state based on message from server
            this.setState(prevState => ({
                receivedMessages: [...prevState.receivedMessages, {fromClient: obj.fromClient, username: obj.username, message: obj.message}]
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

        // Emit message to server
        this.state.socket.emit('server-message', {username: this.state.username, message: this.state.message})
        
        // Set self message in state
        this.setState(prevState => ({
            receivedMessages: [...prevState.receivedMessages, {fromClient: false, username: "You", message: this.state.message}]
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
                        
                        <div className="message-receive-container">
                            <div className="message-receive-text">
                                <b>John</b>
                                <p>Example Receive Keeps going because you cant stop this because it will just keep going and going and going</p>
                            </div>
                        </div>

                        <div className="message-sent-container">
                            <div className="message-sent-text">
                                <b>Donkey Kong</b>
                                <p>Example messages coming from more messages</p> 
                            </div>
                        </div>

                        <div className="message-receive-container">
                            <div className="message-receive-text">
                                <b>Username</b>
                                <p>Example to just keep on chugging along</p>
                            </div>
                        </div>

                        <div className="message-sent-container">
                            <div className="message-sent-text">
                                <b>Dragon</b>
                                <p>Example of sen</p>
                            </div>
                        </div>

                        
                        <div className="message-sent-container">
                            <div className="message-sent-text">
                                <b>Admin</b>
                                <p>Another example just to make sure its all working</p>
                            </div>
                        </div>

                        <div className="message-receive-container">
                            <div className="message-receive-text">
                                <b>User</b>
                                <p>Quick message</p> 
                            </div>
                        </div>
                        <div className="message-receive-container">
                            <div className="message-receive-text">
                                <b>Taco Bunny</b>
                                <p>Another Example</p>
                            </div>
                        </div>


                        {this.state.receivedMessages.map( (el, i) => {
                            // return(<p key={i}>{el.username} {el.message}</p>)
                            console.log(el.fromClient);
                            if(el.fromClient){
                                return(
                                    <div className="message-receive-container" key={i}>
                                        <div className="message-receive-text">
                                            <b>{el.username}</b>
                                            <p>{el.message}</p>
                                        </div>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div className="message-sent-container" key={i}>
                                        <div className="message-sent-text">
                                            <b>{el.username}</b>
                                            <p>{el.message}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })}




                        {/* <div className="message-sender">
                            <form className="form-inline">
                            
                                <input type="text" className="form-control" required/>
                            

                            <input type="submit" value="Send" className="btn btn-primary"/>

                            </form>
                        </div> */}
                        

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