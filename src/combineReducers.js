export function combineReducers(wrapReducers) {
    if (typeof wrapReducers !== "object") {
        throw new Error("all reducers must wrapped in a object!")
    }
    let keynames = Object.keys(wrapReducers)
    return (state, action) => {
        let newState
        let i = 0
        for (i; i < keynames.length; i++) {
            newState = wrapReducers[keynames[i]](state, action)
            if (newState !== state) {
                return newState
            }
            else if (i === keynames.length - 1) {
                return state
            }
        }
    }
}





