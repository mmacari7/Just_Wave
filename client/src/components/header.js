import React, {Component} from "react";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Just Wave</h1>
                    <p className="lead">Welcome to Just Wave, your source for surf and weather information at some of America's hottest surf spots. Select a location for up-to-date reports and to communicate with other local surfers.</p>
                </div>
                <nav aria-label="...">
                    <ul className="pagination pagination-lg justify-content-center">
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
