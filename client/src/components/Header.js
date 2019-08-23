import React, {Component} from "react";
import '../css/index.css'


class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Just Wave</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/seabright">Sea Bright, NJ</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/pipeline">Pipeline, HI</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/newport">Newport Beach, CA</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/laguana">Laguana Beach, CA</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/oceancity">Ocean City, MD</a>
                    </li>
                </ul>
            </div>
            </nav>
        );
    }
}

export default Header;
