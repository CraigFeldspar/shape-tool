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

        this.setBorder(50);
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        self.app.events.emit("draw", this.ctx);
    }

    requestRedraw() {
        // Should buffer redraws
        this.draw();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.draw();
    }

    setBorder(size = 5) {
        this.html.style.border = `${size}px solid teal`;
        this.html.style.width = `calc(100% - ${2 * size}px)`;
        this.html.style.height = `calc(100% - ${2 * size}px)`;
    }

    export() {
        return this.canvas.toDataURL("image/jpeg");
    }

}
