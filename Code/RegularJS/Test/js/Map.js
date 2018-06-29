function Map(values){
  this.map = values;
}

Map.prototype.getTile = function(x, y){
  return this.map[x][y];
}

Map.prototype.draw = function(){
}
