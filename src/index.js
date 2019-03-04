import "@babel/polyfill";
import obsidian from "@obsidianjs/obsidian";

import canvas from "./modules/canvas";
import drawing from "./modules/drawing";
import exporter from "./modules/exporter";
import vue from "./modules/vue";

import "./style/index.less";

const app = obsidian("starter-app");

app.use(vue);
app.use(canvas);
app.use(drawing);
app.use(exporter);

app.start()

// Debug
window.app = app;
