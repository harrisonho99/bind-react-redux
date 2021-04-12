import { useContext, useMemo } from "react"
import ReactReduxContext from "../ReactReduxContext"
// this hook should not use frequently
export const useDispatch = () => {
    return useContext(ReactReduxContext).dispatch
}