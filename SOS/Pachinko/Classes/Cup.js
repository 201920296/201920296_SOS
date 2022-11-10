function Cup(content, x, y, size, r, g, b){
	this.content	= content;
	this.x			= x;
	this.y 			= y;
	this.size		= size;
	this.r 			= r;
	this.g 			= g;
	this.b 			= b;
	
	var options = {
		isStatic: true,
		isSensor: true,
		type: 'cup',
		pointValue: content,
		collisionFilter: {
			group: collider_wall
		}
	};
	this.body = Bodies.rectangle(x, y, 10, 10, options);
	World.add(world, this.body);
	
}

Cup.prototype.draw = function(){
	textSize(this.size);
	fill(this.r, this.g, this.b);
	var label_width = textWidth(this.content);
	text(this.content, this.x - (label_width / 2), this.y);
}