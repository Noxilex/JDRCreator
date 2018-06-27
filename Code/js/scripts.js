//Variables

var c = document.getElementById("map");
var ctx = c.getContext("2d");
var width = c.width;
var height = c.height;
var caseNb = 20;
var caseSizeW = width/caseNb;
var caseSizeH = height/caseNb;
var mousePos = {x:0, y:0};

var coord = document.getElementById("coord");
var tileCoord = document.getElementById("tileCoord");
var tileSize = document.getElementById("tileSize");

var map = new Array(caseNb);

function initMap(){
  for(i = 0; i < caseNb; i++){
    map[i] = new Array(caseNb);
    for(j = 0; j < caseNb; j++){
      map[i][j] = new Tile(j, i, caseSizeW, caseSizeH);
    }
  }
}

function getTile(pos){
  posx = pos.x;
  posy = pos.y;
  tilex = Math.floor(posx/caseSizeW);
  tiley = Math.floor(posy/caseSizeH);
  return map[tiley][tilex];
}

function drawMap(map){
  for(i = 0; i < map.length; i++){
    for(j = 0; j < map[i].length; j++){
      cTile = map[i][j];
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.rect(cTile.x*cTile.width, cTile.y*cTile.height, cTile.width, cTile.height);
      ctx.fill();
    }
  }
}

function drawTile(x, y){
  for(i = 0; i < map.length; i++){
    for(j = 0; j < map[i].length; j++){
      if(j == x & i == y){
        cTile = map[i][j];
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.rect(cTile.x*cTile.width, cTile.y*cTile.height, cTile.width, cTile.height);
        ctx.stroke();
        ctx.fillStyle = cTile.color;
        ctx.fill();
      }
    }
  }
}

function drawGrid(){
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  for(i = 0; i < height; i+= caseSizeH){
    ctx.moveTo(i, 0);
    ctx.lineTo(i, width);
    ctx.stroke();
  }
  for(j = 0; j < width; j+= caseSizeW){
    ctx.moveTo(0, j);
    ctx.lineTo(height, j);
    ctx.stroke();
  }
}

function updateMouse(e){
  mousePos = getMousePos(c, e);
  if(e)
    var pos = getMousePos(c, e);
  else {
    var pos = {x:0,y:0};
  }
  posx = pos.x;
  posy = pos.y;
  tilex = Math.floor(posx/caseSizeW);
  tiley = Math.floor(posy/caseSizeH);
  coord.innerHTML = "Exact Coordinates X:" + Math.round(pos.x) + " Y:" + Math.round(pos.y);
  tileCoord.innerHTML = "Tile Coordinates X:" + Math.floor(tilex) + " Y:" + Math.floor(tiley);
  tileSize.innerHTML = "Tile Width:" + caseSizeW + " Height:"+ caseSizeH;
}

function draw(){
  clear();
  drawGrid();
  var mouseTile = getTile(mousePos);
  drawTile(mouseTile.x, mouseTile.y);
}
window.addEventListener('mousemove', updateMouse, false);

function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

function clear(){
  ctx.clearRect(0, 0, c.width, c.height);
}

//Code
initMap();
drawGrid(ctx);
draw();
setInterval(draw, 1000/30);
