class Cell {
	constructor(x, y, ground = groundType.DIRT) {
		this.pos = new Vector(x, y);
		this.ground = ground;
		this.entity = null;
	}

	draw(ctx, cellSize, color) {
		//Draw the cell ground
		ctx.fillStyle = color ? color : this.ground.color;
		ctx.fillRect(
			this.pos.x * cellSize,
			this.pos.y * cellSize,
			cellSize,
			cellSize
		);

		//Draw the cell entity
		if (this.entity && this.entity != entityType.EMPTY) {
			ctx.fillStyle = this.entity.color;
			ctx.beginPath();
			ctx.arc(
				this.pos.x * cellSize + cellSize / 2,
				this.pos.y * cellSize + cellSize / 2,
				cellSize / 3,
				0,
				2 * Math.PI
			);
			ctx.fill();
			ctx.stroke();
		}
		//Draws the outline
		ctx.strokeRect(
			this.pos.x * cellSize,
			this.pos.y * cellSize,
			cellSize,
			cellSize
		);
	}
}
