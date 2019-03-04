export default class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
    	this.x += v.x;
    	this.y += v.y;
    	return this;
    }

    static Min(v0, v1) {
    	return new Vector(Math.min(v0.x, v1.x), Math.min(v0.y, v1.y));
    }

    static Max(v0, v1) {
    	return new Vector(Math.max(v0.x, v1.x), Math.max(v0.y, v1.y));
    }

}
