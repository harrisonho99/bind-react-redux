import { Component } from "react";
import PropTypes from "prop-types";
import ReactReduxContext from "./ReactReduxContext";

export default class Provider extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ReactReduxContext.Provider value={this.props.store}>
                {this.props.children}
            </ReactReduxContext.Provider>
        );
    }
}

Provider.propTypes = {
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    })
};
