"use strict";
import React, { PropTypes } from "react";
import {bindActionCreators} from "redux";
import ScrollToTop from "react-scroll-up";
import {connect} from "react-redux";

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
                <ScrollToTop showUnder={160}>
                    <img src="/statics/scrollUp.png"/>
                </ScrollToTop>
                {loadingSpinner}
                {this.props.children}
            </div>
        );
    }
}


App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.number,
    UserActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.requestsInProgress
    };
}

export default connect(mapStateToProps)(App);
