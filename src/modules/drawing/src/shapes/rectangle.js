import Vector from "../math/vector";

export default class Rectangle {
    constructor() {
        this.tl = new Vector(0, 0);
        this.br = new Vector(0, 0);
    }

    serialize() {
        return {
            shape: "rect",
            vertices: [this.tl.x, this.tl.y, this.br.x, this.br.y]
        }
    }

    getArea() {
        return (this.br.y - this.tl.y) * (this.br.x - this.tl.x);
    }

    getCenter() {
        return new Vector((this.br.x + this.tl.x) / 2, (this.br.y + this.tl.y) / 2);
    }
}
