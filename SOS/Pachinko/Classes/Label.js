function Label(content, x, y, size, r, g, b){
	this.content	= content;
	this.x			= x;
	this.y 			= y;
	this.size		= size;
	this.r 			= r;
	this.g 			= g;
	this.b 			= b;
	
}

Label.prototype.draw = function(){
	textSize(this.size);
	fill(this.r, this.g, this.b);
	text(this.content, this.x, this.y);
}