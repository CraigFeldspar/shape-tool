import self from "../index";

export default class CanvasController {

    constructor() {
    }

    buildHtml() {
        this.html = document.getElementById("canvas-container");
        this.canvas = document.createElement("canvas");
        this.canvas.className = "canvas-2d";
        this.ctx = this.canvas.getContext("2d");
        this.html.appendChild(this.canvas);

        window.addEventListener("resize", () => this.resizeCanvas());

        this.setBorder(50);
    }

    draw() {
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

}
