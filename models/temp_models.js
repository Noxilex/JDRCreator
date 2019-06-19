class Ground {
	constructor(color) {
		this.color = color;
		//Add other characteristics
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
}

var entityType = {
	EMPTY: new Entity(),
	TREE: new Entity("#228b22")
};
