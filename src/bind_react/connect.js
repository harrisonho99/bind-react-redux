import { PureComponent } from 'react';
import ReactReduxContext from './ReactReduxContext';

/**
 *@param {Function, Function}
 *@returns {React.Component}
 **/
export function connect(mapStateToProps, mapDispatchToProps) {
  return function (ConnectedComponent) {
    return class extends PureComponent {
      constructor(props) {
        super(props);
        this.state = { comsumerState: {} };
      }

      listenStateChange = (subscribe, getState) => {
        // accept subscribe function from store and update the UI
        this.unSubscribe = subscribe(() => {
          this.setState({ comsumerState: getState() });
        });
      };
      componentWillUnmount = () => {
        if (typeof this.unSubscribe === 'function') {
          this.unSubscribe();
        }
      };
      render() {
        return (
          <ReactReduxContext.Consumer>
            {(store) => {
              if (store) {
                const { dispatch, getState, subscribe } = store;
                // handle state change
                this.listenStateChange(subscribe, getState);
                //check what function consumer want to use
                if (mapStateToProps && typeof mapStateToProps === 'function') {
                  this.consumeState = mapStateToProps(getState()); // {state}
                }
                if (
                  mapDispatchToProps &&
                  typeof mapDispatchToProps === 'function'
                ) {
                  this.consumeDispatch = mapDispatchToProps(dispatch); // {dispatch}
                }
                return (
                  <ConnectedComponent
                    {...this.consumeDispatch}
                    {...this.consumeState}
                    {...this.props}
                  />
                );
              }
              return <ConnectedComponent {...this.props} />;
            }}
          </ReactReduxContext.Consumer>
        );
      }
    };
  };
}
