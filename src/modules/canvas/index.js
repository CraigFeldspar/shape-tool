import "./style/index.less";

export default {
    name: "canvas",
    requires: ["vue"],
    load() {
        const CanvasController = require("./src/canvasController").default;
        const cc = new CanvasController();
        cc.buildHtml();
        cc.resizeCanvas();

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(cc);
            }, 0);
        });
    },
    unload() {},
};
