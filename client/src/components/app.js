import React, {Component} from 'react';
import Forecast from './forecast';
import Header from './header';
import Chat from './chat';


// import logo from '../logo.svg';
import '../css/App.css';
import '../css/index.css';



class App extends Component {

  customOnClick = function(){
    fetch("/getMe");
  }

  render(){
    return (
      <div>
        <main>
            <Header />
            {/* <button type="button" className="btn btn-primary" onClick={this.customOnClick}>ClickMe</button> */}
            <Forecast />
            <Chat />
        </main>
      </div>
    );
  }
}

export default App;