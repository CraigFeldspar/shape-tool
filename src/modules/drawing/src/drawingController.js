import self from "../index";

export default class DrawingController {

    constructor() {
        this.buildHtml();
        self.app.events.on("@canvas.draw", this.draw);
        self.app.modules.canvas.requestRedraw();
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
