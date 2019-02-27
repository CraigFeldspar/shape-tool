import self from "../index";

export default class DrawingController {
    constructor() {
        this.buildHtml();
        self.app.events.on("@canvas.draw", this.draw);

        this.state = this.IDLE;
        this.IDLE = 0;
        this.DRAWING = 1;

        this.RECTANGLE = 0;
        this.CIRCLE = 1;
    }

    startDrawing(id) {
        if (this.state == this.DRAWING) {
            this.stopDrawing();
        }

        this.shapeDrawn = id;
        this.state = this.DRAWING;

        console.log(`Drawing ${id}`);
        // self.app.modules.canvas.setCursor("pointer");
    }

    stopDrawing() {
        // self.app.modules.canvas.setCursor("default");
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.rect(150, 150, 150, 150);
        ctx.fill();
    }

    buildHtml() {
        // PASS
        // document.body.appendChild(this.html);
    }

}
