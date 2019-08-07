import React, {Component} from "react";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Just Wave</h1>
                    <p class="lead">Welcome to Just Wave, your source for surf and weather information at some of America's hottest surf spots. Select a location for up-to-date reports and to communicate with other local surfers.</p>
                </div>
                <nav aria-label="...">
                    <ul class="pagination pagination-lg justify-content-center">
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
