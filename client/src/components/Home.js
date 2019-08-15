import React, {Component} from "react";
import '../css/index.css'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid jumbotron-main">
                <div className="container">
                    <h1 className="display-4">Just Wave</h1>
                    <p className="lead">Welcome to Just Wave, your source for surf and weather information at some of America's hottest surf spots. Select a location for up-to-date reports and to communicate with other local surfers.</p>
                </div>
            </div>
        );
    }
}

export default Home;
