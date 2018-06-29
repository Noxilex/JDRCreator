//Variables

var c = document.getElementById("map");
var ctx = c.getContext("2d");
var tileNb = 20;
var tileSize = Math.round(c.height/tileNb);
var mousePos = {x: 0, y:0}
var mouseTile = {x: 0, y:0}

var map = [];

//Utilitaire
function initMap(){
  for(let i = 0; i < tileNb; i++){
    map[i] = [];
    for(let = 0; j < tileNb; j++){
      map[i][j] = new Tile(i, j, tileSize, tileSize);
    }
  }
}

function drawGrid(){
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for(let i = 0; i < c.height; i+= tileSize){
    ctx.moveTo(i, 0);
    ctx.lineTo(i, c.width);
  }
  for(let j = 0; j < c.width; j+= tileSize){
    ctx.moveTo(0, j);
    ctx.lineTo(c.height, j);
  }
  ctx.stroke();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function updateMouse(e){
  pos = getMousePos(c, e);
  mousePos = pos;
  mouseTile.x = Math.floor(pos.x/tileSize);
  mouseTile.y = Math.floor(pos.y/tileSize);

  ctx.clearRect(0, 0, c.width, c.height);
  drawGrid();
  ctx.fillText("Mouse pos: X:" + mousePos.x + " Y:" + mousePos.y,10,10);
  ctx.fillText("Tile pos: X:" + mouseTile.x + " Y:" + mouseTile.y,10,20);
}

//Important functions

function setup(){
  drawGrid();
  //Fill the Map
  for(let i = 0; i < tileNb; i++){
    for(let j = 0; j < tileNb; j++){

    }
  }
}

function draw(){
  ctx.clearRect(0, 0, c.width, c.height);
  for(let i = 0; i < tileNb; i++){
    for(let = 0; j < tileNb; j++){
      map[i][j] = new Tile(i, j, tileSize, tileSize);
    }
  }
  ctx.fillText("Mouse pos: X:" + mousePos.x + " Y:" + mousePos.y,10,10);
  ctx.fillText("Tile pos: X:" + mousePos.x + " Y:" + mousePos.y,10,20);
}



//Running code
setup();
window.addEventListener("mouseclick", updateMouse, false);
window.addEventListener("mousemove", updateMouse, false);
//setInterval(draw, 1000/30);
