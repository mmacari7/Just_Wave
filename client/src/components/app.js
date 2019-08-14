import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './header';
import Forecast from './forecast';
import Chat from './chat';


// import logo from '../logo.svg';
import '../css/App.css';
import '../css/index.css';
// import '../js/script';


{/* <Route
  path='/test'
  render={(props) => <App {...props} loc={1} />}
/> */}

var locationCode = "0001";

class App extends Component {

  customOnClick = function(){
    fetch("/getMe");
  }

  render(){
    return (
      <div>
        <main>
            <Header />
            <button type="button" className="btn btn-primary" onClick={this.customOnClick}>ClickMe</button>
            <Forecast />
            <Chat />
        </main>
      </div>
    );
  }
}

export default App;