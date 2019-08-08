import React, {Component} from "react";
import '../css/index.css'


class Header extends Component {
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
                <nav aria-label="...">
                    <ul className="pagination pagination-lg justify-content-center">
                        <li className="page-item loc-button"><a className="page-link" href="#">Pipeline, HI</a></li>
                        <li className="page-item loc-button"><a className="page-link" href="#">Newport Beach, CA</a></li>
                        <li className="page-item loc-button"><a className="page-link" href="#">Laguna Beach, CA</a></li>
                        <li className="page-item loc-button"><a className="page-link" href="#">Ocean City, MD</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
