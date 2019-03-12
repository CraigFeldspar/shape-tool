import Vector from "../math/vector";

class GridCell {
	constructor(width, height, i, j) {
		this.width = width;
		this.height = height;
		this.i = i;
		this.j = j;
		this.tl = new Vector(i * width, j * height);
		this.br = new Vector((i + 1) * width, (j + 1) * height);

		this.rectangleData = {
			area: 0,
			centerOffset: new Vector(0, 0), // Offset from top-left
			width: 0,
			height: 0,
			background: false
		};
	}

	intersectionRectangle(rectangle) {
		if (rectangle.tl.x <= this.br.x &&
			rectangle.tl.y <= this.br.y &&
			rectangle.br.x >= this.tl.x &&
			rectangle.br.y >= this.tl.y) {
			let newTl = Vector.Max(rectangle.tl, this.tl);
			let newBr = Vector.Min(rectangle.br, this.br);

			return (newBr.y - newTl.y) * (newBr.x - newTl.x);
		}

		return 0;
	}
}

export default class GridController {
	constructor(width, height, iChunks, jChunks) {
		this.width = width;
		this.height = height;

		if (width % iChunks !== 0 || height % jChunks !== 0) {
			throw new Error("Wrong cell sizes");
		}

		// Layout : column by column
		this.cells = [];
		for (let i = 0; i < iChunks; i++) {
			this.cells.push([]);
			for (let j = 0; j < jChunks; j++) {
				this.cells[i].push(new GridCell(width / iChunks, height / jChunks, i, j));
			}
		}
	}

	fillFromRectangles(rectangles) {
		for (let i = 0; i < rectangles.length; i++) {
			let rectangle = rectangles[i];

			for (let i = 0; i < this.cells.length; i++) {
				for (let j = 0; j < this.cells[i].length; j++) {
					let area = this.cells[i][j].intersectionRectangle(rectangle);

					if (area > this.cells[i][j].rectangleData.area) {
						let rectangleData = this.cells[i][j].rectangleData;
						rectangleData.area = area;
						rectangleData.centerOffset = rectangle.getCenter().subtractToNew(this.cells[i][j].tl);
						rectangleData.width = rectangle.br.subtractToNew(rectangle.tl).x;
						rectangleData.height = rectangle.br.subtractToNew(rectangle.tl).y;
					}
				}
			}
		}

		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				if (this.cells[i][j].rectangleData.area === 0) {
					// Fill with background
					this.cells[i][j].rectangleData.area = this.cells[i][j].width * this.cells[i][j].height;
					this.cells[i][j].rectangleData.centerOffset = new Vector(this.width / 2, this.height / 2).subtractToNew(this.cells[i][j].tl);
					this.cells[i][j].rectangleData.width = this.width;
					this.cells[i][j].rectangleData.height = this.height;
					this.cells[i][j].rectangleData.background = true;
				}
			}
		}
	}

	drawDebug(ctx) {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				if (!this.cells[i][j].rectangleData.background) {
					ctx.fillStyle = "blue";
					ctx.beginPath();
					ctx.rect(this.cells[i][j].rectangleData.centerOffset.x + this.cells[i][j].tl.x - this.cells[i][j].rectangleData.width / 2, 
							 this.cells[i][j].rectangleData.centerOffset.y + this.cells[i][j].tl.y - this.cells[i][j].rectangleData.height / 2,
							 this.cells[i][j].rectangleData.width,
							 this.cells[i][j].rectangleData.height);
					ctx.fill();
				}
			}
		}
	}
}