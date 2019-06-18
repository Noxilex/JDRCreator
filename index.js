"use strict";

//Game board
var board;
var canvas = document.querySelector("#visible-canvas");
var cellSize = 30;

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

var selection = {
	from: {},
	to: {},
	area: []
};

function setup() {
	//let boardSizeRaw = prompt("Board size: x y");

	let boardSizeRaw = "30 30";
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

	//Cell fill
	buffer_ctx.fillStyle = "#ffcc88";
	//Cell stroke
	buffer_ctx.strokeStyle = "#ccaa66";
	//Cells draw
	board.draw(buffer_ctx, cellSize);

	//Selection draw
	if (selection.area) {
		selection.area.forEach(cell => {
			buffer_ctx.fillStyle = "rgba(0, 0, 255, 0.1)";
			buffer_ctx.fillRect(
				cell.pos.x * cellSize,
				cell.pos.y * cellSize,
				cellSize,
				cellSize
			);
		});
	}

	//Hovered cell draw
	if (hoveredCell) {
		buffer_ctx.strokeStyle = "black";
		buffer_ctx.strokeRect(
			hoveredCell.pos.x * cellSize,
			hoveredCell.pos.y * cellSize,
			cellSize,
			cellSize
		);
		buffer_ctx.fillStyle = "rgba(255,255,255,0.2)";
		buffer_ctx.fillRect(
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

	selectedArea = [];

	startPos = getMousePos(canvas, event);
	selection.from = getPosFromMousePos(startPos);
});

canvas.addEventListener("mouseup", event => {
	state.SELECTING = false;
	endPos = getMousePos(canvas, event);
	selection.to = getPosFromMousePos(endPos);

	let corners = getCorners(selection.from, selection.to);
	selection.area = board.getCells(corners.tl, corners.br);
});

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
