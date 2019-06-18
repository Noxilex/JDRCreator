class Cell {
	constructor(x, y, ground = groundType.DIRT) {
		this.pos = new Vector(x, y);
		this.ground = ground;
		this.entity = new Entity();
	}

	draw(ctx, cellSize, color) {
		if (color) {
			ctx.fillStyle = color;
		} else {
			ctx.fillStyle = this.ground.color;
		}
		//Draw the cell content
		ctx.fillRect(
			this.pos.x * cellSize,
			this.pos.y * cellSize,
			cellSize,
			cellSize
		);

		//Draws the outline
		ctx.strokeRect(
			this.pos.x * cellSize,
			this.pos.y * cellSize,
			cellSize,
			cellSize
		);
	}
}
