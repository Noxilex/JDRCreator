var nbCells;
var cellSize;
var tab;
var isHovering = false;
var tileHovered;
var selection;
var status = 0;
var buttons = [];
var imgs;
//Utilities


//Input Handlers

function mouseDragged(){
	let tileX = Math.floor(mouseX/cellSize);
	let tileY = Math.floor(mouseY/cellSize);
	if(!tab[tileX] || !tab[tileX][tileY]){
		isHovering = false;
	}else{
		isHovering = true;
		if(tab[tileX][tileY] != tileHovered){
			tileHovered = tab[tileX][tileY];
			tileHovered.state = parseInt(status);
		}
	}
}

function mousePressed(){
	let tileX = Math.floor(mouseX/cellSize);
	let tileY = Math.floor(mouseY/cellSize);
	if(tab[tileX] && tab[tileX][tileY]){
	//	tab[tileX][tileY].clicked();
		console.log("status changed")
		console.log(tab[tileX][tileY])
		tileHovered.state = parseInt(status) ;
	}

}

function mouseMoved(){
	let tileX = Math.floor(mouseX/cellSize);
	let tileY = Math.floor(mouseY/cellSize);
	if(!tab[tileX] || !tab[tileX][tileY]){
		isHovering = false;
	}else{
		isHovering = true;
		if(tab[tileX][tileY] != tileHovered){
			tileHovered = tab[tileX][tileY];
		}
	}
}

function changeStatus(e){
	console.log(e)
	cState = e.target.id;
	switch (cState) {
		case "ground":
			status = 0;
			break;
		case "player":
			status = 1;
			break;
		case "water":
			status = 2;
			break;
		case "tree":
			status = 3;
			break;
		case "ennemy":
			status = 4;
			break;
		default:
			status = 0;

	}
}

/*
	Don't forget to add a new case in changeStatus() above
*/
function addSelectButton(name, imgSrc){
	let button = createButton(name);
	button.html('<img src="'+imgSrc+'"/>', false);
	button.id(name);
	console.log(button);
	button.mousePressed(changeStatus);
	return button;
}

function initMap(nbCells){
	let tab = [];
	for(var i = 0; i < nbCells; i++){
		tab[i] = [];
		for(var j = 0; j < nbCells; j++){
			tab[i][j] = new Cell(i*cellSize, j*cellSize, cellSize);
			//tab[i][j].state = Math.floor(random(5));
			tab[i][j].state = 0;
		}
	}
	return tab;
}

function setup() {
	createCanvas(601, 601);
	//cT = createGraphics(300, 200);

	imgs = [];
	imgs["tree"] = loadImage("images/tree.PNG");
	imgs["ground"] = loadImage("images/ground.PNG");
	imgs["ennemy"] = loadImage("images/ennemy.PNG");
	imgs["water"] = loadImage("images/water.PNG");

	bTree = addSelectButton("tree", "images/tree.PNG");
	bGround = addSelectButton("ground", "images/ground.PNG");
	bEnnemy = addSelectButton("ennemy", "images/ennemy.PNG");
	bWater = addSelectButton("water", "images/water.PNG");

	nbCells = 20;
	cellSize = Math.round(height/nbCells);

	console.log(cellSize);

	tab = initMap(nbCells);

}

function draw() {
	background(255);
	//cT.background(0);
	//cT.noStroke();

	//Draws the cells of the table
	for(var i = 0; i < nbCells; i++){
		for(var j = 0; j < nbCells; j++){
			tab[i][j].show();
		}
	}

	//If mouse is hovering, show an outline of the tile being hovered
	if(isHovering){
		strokeWeight(3);
		stroke('red');
		noFill();
		rect(tileHovered.x, tileHovered.y, tileHovered.h, tileHovered.w);
	}
}
