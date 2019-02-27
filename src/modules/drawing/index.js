// import "./style/index.less";

export default {
    name: "drawing",
    requires: ["canvas", "vue"],
    load() {
        const DrawingController = require("./src/drawingController").default;

        this.drawingController = new DrawingController();
        this.app.modules.canvas.requestRedraw();

        // this.app.modules.vue.$refs["drawing"].$data.drawShape = this.drawingController.startDrawing;
        this.app.modules.vue.$refs["drawing"].startDrawing = (id) => this.drawingController.startDrawing(id);
        return this.drawingController;
    },
    unload() {},
};
