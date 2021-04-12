import { useState, useContext, useEffect } from "react"
import ReactReduxContext from "../ReactReduxContext"

//const state = useSelector(state => state.state) 
const useSelector = (selector) => {
    if (typeof selector !== "function") {
        throw Error("Selector should be a function accept state and return selected state.")
    }
    const { getState, subscribe } = useContext(ReactReduxContext)
    const [state, setState] = useState(getState())
    useEffect(() => {
        let unSubscribe = subscribe(() => {
            setState(getState())
        })
        return unSubscribe
    }, [])

    return selector(state)
}
export { useSelector }