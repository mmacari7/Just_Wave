import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

// Import our routes for the react router
import Home from './Home';
import Header from './Header';
import SeaBright from './SeaBright';
import Pipeline from './Pipeline';
import NewPort from './NewPort';
import Laguana from './Laguana';
import OceanCity from './OceanCity';

import '../css/App.css';
import '../css/index.css';

{/* <Route
  path='/test'
  render={(props) => <App {...props} loc={1} />}
/> */}

var locationCode = "0001";

class App extends Component {

	customOnClick = async function () {
		// axios.get("/api/getMe").then(response => {
		// 	console.log(response.data);
		// }).catch(error => {
		// 	console.log(error);
		// })

		let res = await axios.get("/api/getMe", {params: {message: "Hello"}});
		console.log(res.data);
		return;

	}

	render() {
		return (
			<Router>
				<Header />
				<button type="button" className="btn btn-primary" onClick={this.customOnClick}>ClickMe</button>
				{/* <Switch> */}
				<Route exact path="/" component={Home} />
				<Route path="/seabright" component={SeaBright} />
				<Route path="/pipeline" component={Pipeline} />
				<Route path="/newport" component={NewPort} />
				<Route path="/laguana" component={Laguana} />
				<Route path="/oceancity" component={OceanCity} />
				{/* </Switch> */}
			</Router>

		);
	}
}

export default App;