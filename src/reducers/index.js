import { combineReducers } from "../combineReducers"
import { decrementReducer } from "./decrementReducer"
import { incrementReducer } from "./incrementReducer"

// combined all reducers
const rootReducer = { decrementReducer, incrementReducer }
export default combineReducers(rootReducer)