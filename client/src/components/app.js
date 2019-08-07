import React, {Component} from 'react';
import Forecast from './forecast';
import Header from './header';


// import logo from '../logo.svg';
import '../css/App.css';


class App extends Component {
  render(){
    return (
      <div>
        <main>
            <div>
                <h1>Test Title from Components/App.js</h1>
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