"use strict";

//Game board
var board;
var canvas = document.querySelector("#visible-canvas");
var cellSize = 45;

//Interactive cells
var selectedArea;
var hoveredCell;

//Mouse positions
var mousePos;
var startPos;
var endPos;

//State
var state = {
	SELECTING: false
};

//Selection
var selection = {
	from: {},
	to: {},
	tileElement: groundType.DIRT,
	area: []
};

//Colors
var outline = "rgba(0,0,0,0.5)";

function setupUI() {
	// Setup ground buttons
	let groundButtons = document.querySelector("#ground-buttons");

	for (const type in groundType) {
		let button = document.createElement("button");

		if (groundType.hasOwnProperty(type)) {
			const ground = groundType[type];
			button.innerText = type;
			button.style.backgroundColor = ground.color;
			button.onclick = function() {
				selection.tileElement = ground;
			};
			groundButtons.appendChild(button);
		}
	}

	// Setups entities buttons
	let entitiesButtons = document.querySelector("#entities-buttons");

	for (const type in entityType) {
		let button = document.createElement("button");

		if (entityType.hasOwnProperty(type)) {
			const entity = entityType[type];
			button.innerText = type;
			if (entity) {
				button.style.backgroundColor = entity.color;
			}
			button.onclick = function() {
				selection.tileElement = entity;
			};
			entitiesButtons.appendChild(button);
		}
	}
}

function setup() {
	//let boardSizeRaw = prompt("Board size: x y");

	//Setup the UI
	setupUI();

	//Setup board
	let boardSizeRaw = "20 20";
	let sizeRaw = boardSizeRaw.split(" ");
	if (sizeRaw.length != 2) {
		throw new Error("Wrong number of arguments");
	} else if (!parseInt(sizeRaw[0]) || !parseInt(sizeRaw[1])) {
		throw new Error("Values provided are not numbers");
	} else {
		console.log("All is well");
		canvas.width = cellSize * sizeRaw[0];
		canvas.height = cellSize * sizeRaw[1];
		board = new Board(sizeRaw[0], sizeRaw[1]);
		board.setup();
	}
}

function updateGame() {
	processPlayerInput();
	updateGameLogic();
	draw();
	requestAnimationFrame(updateGame);
}

function processPlayerInput() {}

function updateGameLogic() {}

function draw() {
	//Create a buffer to modify canvas without interrupting the live canvas
	var buffer = document.createElement("canvas");
	var canvas = document.getElementById("visible-canvas");

	buffer.width = canvas.width;
	buffer.height = canvas.height;

	var buffer_ctx = buffer.getContext("2d");
	var ctx = canvas.getContext("2d");

	//Cell fill (overwritten by cell color)
	buffer_ctx.fillStyle = "#ffcc88";
	//Cells draw
	board.draw(buffer_ctx, cellSize, outline);

	//Selection draw
	if (selection.area) {
		selection.area.forEach(cell => {
			selection.tileElement.draw(buffer_ctx, cell.pos, cellSize);
			buffer_ctx.fillStyle = "rgba(255,255,255,0.2)";
			buffer_ctx.fillRect(
				cell.pos.x * cellSize,
				cell.pos.y * cellSize,
				cellSize,
				cellSize
			);
		});

		//TODO: Fix outline left selection
		// buffer_ctx.strokeStyle = "white";
		// buffer_ctx.lineWidth = 3;
		// buffer_ctx.strokeRect(
		// 	selection.from.x * cellSize,
		// 	selection.from.y * cellSize,
		// 	(selection.to.x - selection.from.x) * cellSize + cellSize,
		// 	(selection.to.y - selection.from.y) * cellSize + cellSize
		// );
	}

	//Hovered cell draw
	if (hoveredCell) {
		selection.tileElement.draw(buffer_ctx, hoveredCell.pos, cellSize);
		//White hover
		buffer_ctx.fillStyle = "rgba(255,255,255,0.1)";
		buffer_ctx.fillRect(
			hoveredCell.pos.x * cellSize,
			hoveredCell.pos.y * cellSize,
			cellSize,
			cellSize
		);
		buffer_ctx.lineWidth = 2;
		buffer_ctx.strokeStyle = "rgba(255,255,255,0.2)";
		buffer_ctx.strokeRect(
			hoveredCell.pos.x * cellSize,
			hoveredCell.pos.y * cellSize,
			cellSize,
			cellSize
		);
	}

	//Put buffer in visible canvas
	ctx.drawImage(buffer, 0, 0);
}
setup();
updateGame();

/**
 * Listeners
 */

canvas.addEventListener("mousemove", event => {
	mousePos = getMousePos(canvas, event);
	if (state.SELECTING) {
		selection.to = getPosFromMousePos(mousePos);
		let corners = getCorners(selection.from, selection.to);
		selection.area = board.getCells(corners.tl, corners.br);
	}
	hoveredCell = getCellAtMousePos(mousePos, cellSize);
});

canvas.addEventListener("mousedown", event => {
	state.SELECTING = true;

	resetSelection();

	startPos = getMousePos(canvas, event);
	selection.from = getPosFromMousePos(startPos);
});

document.addEventListener("mouseup", event => {
	state.SELECTING = false;
	fillSelection(selection);
	resetSelection();
});

canvas.addEventListener("mouseup", event => {
	state.SELECTING = false;
	endPos = getMousePos(canvas, event);
	selection.to = getPosFromMousePos(endPos);

	let corners = getCorners(selection.from, selection.to);
	selection.area = board.getCells(corners.tl, corners.br);
	fillSelection(selection);
	resetSelection();
});

canvas.addEventListener("mouseleave", event => {
	hoveredCell = null;
});

/**
 * Fills the selected area with the type selected
 * @param {*} selection
 */
function fillSelection(selection) {
	selection.area.forEach(elt => {
		setType(elt);
	});
}

function resetSelection() {
	selection.area = [];
	selection.from = {};
	selection.to = {};
}

function setType(elt) {
	if (selection.tileElement instanceof Ground) {
		elt.ground = selection.tileElement;
	} else if (selection.tileElement instanceof GameObject) {
		elt.object = selection.tileElement;
	} else if (selection.tileElement instanceof GameCharacter) {
		elt.character = selection.tileElement;
	} else if (
		selection.tileElement instanceof Entity &&
		selection.tileElement == entityType.EMPTY
	) {
		elt.character = selection.tileElement;
		elt.object = selection.tileElement;
	}
}

function getCellAtMousePos(mousePos, cellSize) {
	return board.getCell(
		Math.floor(mousePos.x / cellSize),
		Math.floor(mousePos.y / cellSize)
	);
}

/**
 * Returns mouse position based on canvas & mouse event
 * @param {Canvas} canvas
 * @param {Event} e
 */
function getMousePos(canvas, e) {
	let rect = canvas.getBoundingClientRect();
	let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
	return new Vector(x, y);
}

function getPosFromMousePos(mousePos) {
	return new Vector(
		Math.floor(mousePos.x / cellSize),
		Math.floor(mousePos.y / cellSize)
	);
}

/**
 * Returns the smallest x & y for top-left
 * Return the highest x & y for bottom-right
 * @param {*} cell1
 * @param {*} cell2
 */
function getCorners(cell1, cell2) {
	return {
		tl: {
			x: Math.min(cell1.x, cell2.x),
			y: Math.min(cell1.y, cell2.y)
		},
		br: {
			x: Math.max(cell1.x, cell2.x),
			y: Math.max(cell1.y, cell2.y)
		}
	};
}
