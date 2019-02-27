import "@babel/polyfill";
import obsidian from "@obsidianjs/obsidian";

import canvas from "./modules/canvas";
import drawing from "./modules/drawing";

import "./style/index.less";

const app = obsidian("starter-app");

app.use(canvas);
app.use(drawing);

app.start();

// Debug
window.app = app;
