import "./styles.css";
import { connect } from "../bind_react/connect"
function App(props) {
    const { state, dispatch } = props
    return (
        <div className="App">
            <button onClick={() => {
                dispatch({ type: "INCREMENT" })
            }}>
                INCREMENT
            </button>
            <h1>
                {state.value}
            </h1>
            <button onClick={() => {
                dispatch({ type: "DECREMENT" })
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