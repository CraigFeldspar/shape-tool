import self from "../index";
import axios from "axios";

export default class CanvasController {

    constructor() {}

    buildHtml() {
        this.html = document.getElementById("canvas-container");
        this.canvas = document.createElement("canvas");
        this.canvas.className = "canvas-2d";
        this.ctx = this.canvas.getContext("2d");
        this.html.appendChild(this.canvas);

        window.addEventListener("resize", () => this.resizeCanvas());

        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        this.canvas.addEventListener("mouseup", (e) => this.onMouseUp(e));
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this._isDragging = false;

        this.setSize();
    }

    onMouseDown(e) {
        this._isDragging = true;
        self.app.events.emit("dragstart", e);
    }

    onMouseUp(e) {
        this._isDragging = false;
        self.app.events.emit("dragend", e);
    }

    onMouseMove(e) {
        if (this._isDragging) {
            self.app.events.emit("dragging", e);
        } else {
            self.app.events.emit("mousemove", e);
        }
    }

    setCursor(cursor) {
        this.canvas.style.cursor = cursor;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        self.app.events.emit("draw", this.ctx);
    }

    requestRedraw() {
        // Should buffer redraws
        this.draw();
    }

    resizeCanvas() {
        // Do not resize since we used fixed size images as inputs to NN
        return;
    }

    setSize() {
        this.html.style.border = "auto solid teal";
        this.html.style.width = "1000px";
        this.html.style.height = "500px";
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    export() {
        return this.canvas.toDataURL("image/jpeg");
    }

}
