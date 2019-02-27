// import "./style/index.less";

export default {
    name: "drawing",
    requires: ["canvas"],
    load() {
        const DrawingController = require("./src/drawingController").default;

        return new DrawingController();
    },
    unload() {},
};
