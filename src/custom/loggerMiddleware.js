
//helper colored
function coloredLogger(
    content,
    background = "transparent",
    padding = 0,
    color = "black",
    fontSize = 10,
    ...agrs
) {
    if (content) {
        console.log(
            `%c ${content}`,
            `background:${background}; padding:${padding}px; color:${color}; margin: 3px; font-size:${fontSize}px`,
            ...agrs
        );
    }
}
//logger middleware
const logger = (storeAPI) => (next) => (action) => {
    if (typeof action !== "object") {
        return next(action)
    }
    coloredLogger(
        "<--prev state-->",
        "#f73378",
        2,
        "white",
        12,
        storeAPI.getState()
    );
    // pipe action
    next(action);
    coloredLogger(
        " action: " + action.type,
        undefined,
        0,
        "#304ffe",
        12
    );
    coloredLogger(
        "<--next state-->",
        "#14a37f",
        2,
        "white",
        12,
        storeAPI.getState()
    );
    coloredLogger(
        "------------------------",
        undefined,
        undefined,
        "green"
    );
};

export { logger };
