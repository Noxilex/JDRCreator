function Cell(x, y, size){
	this.x = x;
	this.y = y;
	this.h = size;
	this.w = size;
	this.state = 0;	//State defines what's in the Cell
	this.color = color(0, 0, 0);
	this.enabled = true;
}

Cell.prototype.show = function(){
	strokeWeight(2);
	noStroke();
		stroke(0);
	image(imgs["ground"], this.x, this.y, this.h, this.w);
	if(this.enabled){
		switch (this.state) {
			case 0:
				break;
			case 1:
				fill("red");
				ellipse(this.x+this.w*0.5, this.y+this.h*0.5, this.w*0.5);
				break;
			case 2:
				image(imgs["water"], this.x, this.y, this.h, this.w);
				break;
			case 3:
				image(imgs["tree"], this.x, this.y, this.h, this.w);
				break;
			case 4:
				image(imgs["ennemy"], this.x, this.y, this.h, this.w);
				break;
			default:

		}
	}

}

Cell.prototype.clicked = function(){
		this.state = (this.state+1)%5;
}

Cell.prototype.isClicked = function(){
	if(mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h){
		return true;
	}
	else {
		return false;
	}
}
