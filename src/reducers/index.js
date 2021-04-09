import { combineReducers } from "../combineReducers"
import { decrementReducer } from "./decrementReducer"
import { incrementReducer } from "./incrementReducer"

// combined all reducers
export default combineReducers({
    decrementReducer, incrementReducer
})