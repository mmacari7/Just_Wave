import React, {Component} from "react";
import '../css/index.css'

class Forecast extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container forecast-container">
                <h2 className="loc-heading">Beach Name, State</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-sm fc-item">
                            <div className="row">
                                <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Temperature</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                        <div className="row">
                        <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Cloud Cover</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Chance of Precip</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm fc-item">
                            <div className="row">
                                <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Depth of Sea Floor</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                        <div className="row">
                        <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Tides</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Human Concentration</p>
                            </div>
                        </div>
                        <div className="col-sm fc-item">
                            <div className="row">
                            <img src="..." alt="img" width="200" height="150"/>
                            </div>
                            <div className="row">
                                <p>Breakpoints</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forecast;
