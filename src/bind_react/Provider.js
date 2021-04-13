import { Component } from "react";
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


