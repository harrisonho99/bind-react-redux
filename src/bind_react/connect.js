import React from "react";
import ReactReduxContext from "./ReactReduxContext";



/**
*@param {Function, Function}
*@returns {React.Component}
**/
export function connect(mapStateToProps, mapDispatchToProps) {
    return function (ConnectedComponent) {
        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = { comsumerState: {} }
            }
            listenStateChange = (subscribe, getState) => {
                // accept subscribe function from store and update the UI
                subscribe(() => {
                    this.setState({ comsumerState: getState() })
                })
            }
            render() {
                let consumeState
                let consumeDispatch
                return (
                    <ReactReduxContext.Consumer>
                        {({ dispatch, getState, subscribe }) => {
                            // handle state change
                            this.listenStateChange(subscribe, getState)
                            //check what function consumer want to use
                            if (mapStateToProps && typeof mapStateToProps === "function") {
                                consumeState = mapStateToProps(getState()); // {state}
                            }
                            if (mapDispatchToProps && typeof mapDispatchToProps === "function") {
                                consumeDispatch = mapDispatchToProps(dispatch); // {dispatch}
                            }
                            return < ConnectedComponent {...consumeDispatch} {...consumeState} {...this.props} />
                        }}
                    </ReactReduxContext.Consumer>
                );
            }
        };
    };
}
