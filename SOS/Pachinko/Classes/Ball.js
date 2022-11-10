var ballSize = ballRad;

function Ball(){
	this.spawn();
}

Ball.prototype.spawn = function() {
	this.body = Bodies.circle(50, 5, ballSize);
	this.restTime = 0;
	this.dropped = false;
};

Ball.prototype.drop = function() {
	var options = {
		restitution: 0.5,
		friction: .3,
		sleepThreshold: 5,
		collisionFilter: {
			group: collider_ball
		}
	};
	var pos = this.body.position;	
	var x = mouseX + (random(10)-5);
	this.body = Bodies.circle(x, pos.y, ballSize, options);
	World.add(world, this.body);
	this.dropped = true;
};

Ball.prototype.claimPoints = function(){
	for (var i = 0; i < cups.length; i ++){
		if (Matter.Bounds.overlaps(ball.body.bounds, cups[i].body.bounds)) {
			score += cups[i].body.pointValue;
			newScore();
			break;
		}
	}
};

Ball.prototype.show = function() {
	fill(255);
	stroke(255);
	
	var pos = this.body.position;
	if(this.restTime >= 70){
		this.claimPoints();
		World.remove(world, this.body);
		this.spawn();
	} else {
		push();
		if(this.dropped){
			if(this.body.speed < 1){
				this.restTime ++;
			}
			translate(pos.x, pos.y);
		} else {
			translate(mouseX, pos.y);
		}
		ellipse(0, 0, ballSize * 2); 	
		pop();
	}
	
};