"use strict";
import React, { PropTypes } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Footer} from "./common/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingSpinner;
        if (this.props.loading) {
            loadingSpinner = <div className="loader"></div>;
        }
        return (
            <div>
                {loadingSpinner}
                {this.props.children}
                <Footer />
            </div>
        );
    }
}


App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.number
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.requestsInProgress
    };
}

export default connect(mapStateToProps)(App);
