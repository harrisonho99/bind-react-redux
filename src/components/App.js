import "./styles.css";
import { asyncDecrement } from "../actionCreators/asyncDecrement"
import { asyncIncrement } from "../actionCreators/asyncIncrement"
import { connect } from "../bind_react/connect"
import { syncDecrement } from "../actionCreators/syncDecrement"
import { syncIncrement } from "../actionCreators/syncIncrement"

function App(props) {
    const { state, dispatch } = props
    return (
        <div className="App">
            <button onClick={() => {
                dispatch(asyncIncrement())
            }}>
                INCREMENT
            </button>
            <h1>
                {state.value}
            </h1>
            <button onClick={() => {
                dispatch(asyncDecrement())
            }}>
                DECREMENT
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { state }
}
const mapDispatchToProps = (dispatch) => {
    return ({ dispatch })
}
export default connect(mapStateToProps, mapDispatchToProps)(App)