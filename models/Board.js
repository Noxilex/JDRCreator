class Board {
	/**
	 *
	 * @param {*} height Number of cells vertically
	 * @param {*} width Number of cells horizontally
	 */
	constructor(height, width) {
		this.height = height;
		this.width = width;
		this.cells = [];
	}

	/**
	 *      x
	 *   |---->
	 * y |---->
	 *   v
	 */
	setup() {
		//Resets cell array
		this.cells = [];

		//Populate it with Cell objects
		for (let y = 0; y < this.height; y++) {
			let line = [];
			for (let x = 0; x < this.width; x++) {
				line.push(new Cell(x, y));
			}
			this.cells.push(line);
		}
	}

	/**
	 * Returns the cell at pos {x,y}
	 * @param {*} x
	 * @param {*} y
	 */
	getCell(x, y) {
		if (y >= 0 && y < this.height && x >= 0 && x <= this.width) {
			return this.cells[y][x];
		}
	}

	/**
	 * Returns an array of cells between from & to
	 * @param {*} from Initial position of the sub array
	 * @param {*} to End position of the sub array
	 */
	getCells(from, to) {
		let cells = [];
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (x >= from.x && x <= to.x && y >= from.y && y <= to.y) {
					cells.push(this.getCell(x, y));
				}
			}
		}

		return cells;
	}

	/**
	 * Draw function
	 */
	draw(ctx, cellSize, outlineColor) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.getCell(x, y).draw(ctx, cellSize);
				//Draw outline
				ctx.lineWidth = 1;
				ctx.strokeStyle = outlineColor;
				ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}
		}
	}
}
