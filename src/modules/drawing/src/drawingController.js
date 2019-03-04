import self from "../index";
import Rectangle from "./shapes/rectangle";
import Vector from "./math/vector";

export default class DrawingController {
    constructor() {
        this.buildHtml();
        self.app.events.on("@canvas.draw", (ctx) => this.draw(ctx));
        self.app.events.on("@canvas.dragstart", (e) => this.onDragStart(e));
        self.app.events.on("@canvas.dragging", (e) => this.onDragging(e));
        self.app.events.on("@canvas.dragend", (e) => this.onDragEnd(e));

        this.state = this.IDLE;
        this.IDLE = 0;
        this.DRAWING = 1;

        this.RECTANGLE = 0;
        this.CIRCLE = 1;

        this.shapes = [];
        this.currentShape = null;
        this._origin = null;
    }

    onDragStart(event) {
        if (!this.currentShape) {
            return;
        }

        this._origin = new Vector(event.offsetX, event.offsetY);

        this.currentShape.tl.x = this._origin.x;
        this.currentShape.tl.y = this._origin.y;
        this.currentShape.br.x = this._origin.x;
        this.currentShape.br.y = this._origin.y;
    }

    onDragging(event) {
        if (!this.currentShape) {
            return;
        }

        let v0 = new Vector(event.offsetX, event.offsetY);

        this.currentShape.tl = Vector.Min(this._origin, v0);
        this.currentShape.br = Vector.Max(this._origin, v0);

    }

    onDragEnd(event) {
        this.stopDrawing();
    }

    startDrawing(id) {
        if (this.state == this.DRAWING) {
            this.stopDrawing();
        }

        if (id === this.RECTANGLE) {
            this.currentShape = new Rectangle();
        } else if (id === this.CIRCLE) {
            // this.currentShape = new Circle();
        }

        this.state = this.DRAWING;
        this.shapes.push(this.currentShape);

        console.log(`Drawing ${id}`);
        // self.app.modules.canvas.setCursor("pointer");
    }

    stopDrawing() {
        this.state = this.IDLE;

        if (!this.currentShape) {
            return;
        }
        
        this.currentShape = null;
        // self.app.modules.canvas.setCursor("default");
    }

    draw(ctx) {
        for (let i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i] instanceof Rectangle) {
                this.drawRectangle(this.shapes[i], ctx);
            }
        }
    }

    drawRectangle(rect, ctx) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(rect.tl.x, rect.tl.y, rect.br.x - rect.tl.x, rect.br.y - rect.tl.y);
        ctx.fill();
    }

    buildHtml() {
        // PASS
        // document.body.appendChild(this.html);
    }

    export() {
        let shapes = []
        for (let i = 0; i < this.shapes.length; i++) {
            shapes.push(this.shapes[i].serialize());
        }

        return shapes;
    }

}
