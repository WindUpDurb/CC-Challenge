"use strict";
import React, { PropTypes } from "react";
import {connect} from "react-redux";
import {Footer} from "./common/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}


App.propTypes = {
    children: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

export default connect(mapStateToProps)(App);
