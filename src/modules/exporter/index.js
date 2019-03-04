// import "./style/index.less";

export default {
    name: "exporter",
    requires: ["canvas", "drawing"],
    load() {
        const ExporterController = require("./src/exporterController").default;

        this.exporterController = new ExporterController();

        return this.exporterController;
    },
    unload() {},
};
