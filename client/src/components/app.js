import React, {Component} from 'react';
import Forecast from './forecast';
import Header from './header';


// import logo from '../logo.svg';
import '../css/App.css';


class App extends Component {

  customOnClick = function(){
    fetch("/getMe");
  }

  render(){
    return (
      <div>
        <main>
            <div>
                <h1>Test Title from Components/App.js</h1>
                <button type="button" className="btn btn-primary" onClick={this.customOnClick}>ClickMe</button>
            </div>
            <div>
                <Header />
            </div>
        </main>
      </div>
    );
  }
}

export default App;