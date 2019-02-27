import "./style/index.less";

export default {
    name: "canvas",
    requires: [],
    load() {
        const CanvasController = require("./src/canvasController").default;
        const cc = new CanvasController();

        return new Promise((resolve) => {
            setTimeout(() => {
                cc.resizeCanvas();
                resolve(cc);
            }, 0);
        });
    },
    unload() {},
};
