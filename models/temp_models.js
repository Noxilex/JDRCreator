class Ground {
	constructor(color) {
		this.color = color;
		//Add other characteristics
	}

	draw(ctx, pos, cellSize, color) {
		ctx.fillStyle = color ? color : this.color;
		ctx.fillRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize);
	}
}

var groundType = {
	ROCK: new Ground("#a9a9a9"),
	DIRT: new Ground("#9b7653"),
	GRASS: new Ground("#66b032"),
	WATER: new Ground("#a4f4f9"),
	SAND: new Ground("#c2b280")
};

class Entity {
	constructor(color) {
		this.color = color;
		this.name;
		this.image;
	}

	draw(ctx) {
		//Sets default
		ctx.lineWidth = 1;
		ctx.fillStyle = "black";
		ctx.strokeStyle = "black";
	}
}
class GameCharacter extends Entity {
	constructor(color) {
		super(color);
	}

	draw(ctx, pos, cellSize, color) {
		super.draw(ctx);
		ctx.fillStyle = color ? color : this.color;
		ctx.beginPath();
		ctx.arc(
			pos.x * cellSize + cellSize / 2,
			pos.y * cellSize + cellSize / 2,
			cellSize / 3,
			0,
			2 * Math.PI
		);
		ctx.fill();
		ctx.stroke();
	}
}

class GameObject extends Entity {
	constructor(color) {
		super(color);
	}

	draw(ctx, pos, cellSize, color) {
		super.draw(ctx);
		let l = pos.x * cellSize;
		let t = pos.y * cellSize;
		let b = t + cellSize;
		let r = l + cellSize;

		ctx.fillStyle = color ? color : this.color;
		//Octogone
		ctx.beginPath();
		ctx.moveTo(l + (cellSize * 1) / 3, t);
		ctx.lineTo(l + (cellSize * 2) / 3, t);
		ctx.lineTo(r, t + (cellSize * 1) / 3);
		ctx.lineTo(r, t + (cellSize * 2) / 3);
		ctx.lineTo(l + (cellSize * 2) / 3, b);
		ctx.lineTo(l + (cellSize * 1) / 3, b);
		ctx.lineTo(l, t + (cellSize * 2) / 3);
		ctx.lineTo(l, t + (cellSize * 1) / 3);
		ctx.fill();
		ctx.stroke();
	}
}

var entityType = {
	EMPTY: new Entity(),
	TREE: new GameObject("#228b22"),
	STONE: new GameObject("#91a3b0"),
	WOOD: new GameObject("#c19a6b"),
	REDWOOD: new GameObject("#a45a52"),
	DARKWOOD: new GameObject("#654321"),
	ENNEMY: new GameCharacter("#FF0000"),
	ALLY: new GameCharacter("#00FF00")
};
