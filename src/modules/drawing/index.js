// import "./style/index.less";

export default {
    name: "drawing",
    requires: ["canvas", "vue"],
    load() {
        const DrawingController = require("./src/drawingController").default;

        const exporter = this.app.modules.exporter;
        this.drawingController = new DrawingController();
        this.app.modules.canvas.requestRedraw();
        this.app.modules.vue.$refs["drawing"].startDrawing = (id) => this.drawingController.startDrawing(id);
        this.app.modules.vue.$refs["drawing"].stopDrawing = (id) => this.drawingController.stopDrawing();
        this.app.modules.vue.$refs["drawing"].clear = () => this.drawingController.clear();
        this.app.modules.vue.$refs["drawing"].save = () => this.app.events.emit("save");

        return this.drawingController;
    },
    unload() {},
};
