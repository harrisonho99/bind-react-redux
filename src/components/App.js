import "./styles.css";
import { asyncDecrement } from "../actionCreators/asyncDecrement"
import { asyncIncrement } from "../actionCreators/asyncIncrement"
import { connect } from "../bind_react/connect"
import { syncDecrement } from "../actionCreators/syncDecrement"
import { syncIncrement } from "../actionCreators/syncIncrement"
import { useSelector } from "../bind_react/hook/useSelector"
import { useDispatch } from "../bind_react/hook/useDispatch"
function App(props) {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    // const { state, dispatch } = props
    return (
        <div className="App">
            <button onClick={() => {
                dispatch(asyncIncrement())
            }}>
                INCREMENT ASYNC
            </button>
            <h1>
                {state.value}
            </h1>
            <button onClick={() => {
                dispatch(asyncDecrement())
            }}>
                DECREMENT ASYNC
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