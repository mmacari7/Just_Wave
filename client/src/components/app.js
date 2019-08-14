import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
// Import our routes for the react router
import Home from './Home';
import Header from './Header';
import SeaBright from './SeaBright';
// import Forecast from './Forecast';
// import Chat from './Chat';

// import logo from '../logo.svg';
import '../css/App.css';
import '../css/index.css';


{/* <Route
  path='/test'
  render={(props) => <App {...props} loc={1} />}
/> */}

var locationCode = "0001";

class App extends Component {

  customOnClick = function(){
    axios.get("/api/getMe").then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  render(){
    return (
      <Router>
        <Header/>
        <button type="button" className="btn btn-primary" onClick={this.customOnClick}>ClickMe</button>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/seabright" component={SeaBright}/>
        </Switch>
      </Router>
      
      //<Header/>
      // <Router>
      //   <Route path="/" component={Home}></Route>
        
      // </Router>

      
      // <div>
      //   <main>
      //       <Header />

      //       <button type="button" className="btn btn-primary" onClick={this.customOnClick}>ClickMe</button>
      //       {/* <Forecast />
      //       <Chat /> */}
      //   </main>
      // </div>
    );
  }
}

export default App;