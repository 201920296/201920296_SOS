var studSize = studRad;

function Stud(x, y){
	var options = {
		isStatic: true,
		restitution: 0.01,
		friction: 0.5,
		collisionFilter: {
			group: collider_stud
		}
	};
	this.body = Bodies.circle(x, y, studSize, options);
	World.add(world, this.body);

}

Stud.prototype.show = function() {
	
	fill(255);
	stroke(255);
	var pos = this.body.position;
		
	push();
	translate(pos.x, pos.y);
	ellipse(0, 0, studSize * 2); 	
	pop();
	
};