class Cell {
	constructor(x, y, ground = groundType.DIRT, entity = entityType.EMPTY) {
		this.pos = new Vector(x, y);
		this.ground = ground;
		this.character = entity;
		this.object = entity;
	}

	draw(ctx, cellSize, color) {
		//Draws ground
		this.ground.draw(ctx, this.pos, cellSize, color);
		//Draws entity
		this.object.draw(ctx, this.pos, cellSize);
		this.character.draw(ctx, this.pos, cellSize);
	}
}
