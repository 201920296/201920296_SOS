//매터 바들
var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events
    Bodies = Matter.Bodies;
     
//다른 => 이라기보단 '우리(our) 바'라고 하는 게 맞겠다.
var engine;
var world;
var ball;
var score;
var scoreLabel;
var cups = [];
var studs = [];
var bounds = [];

//오디오 바
var audio_contact_wall;
var audio_contact_stud;

function setup(){
	
	// 시작용 그래픽 엔진(Engine)묶음
	createCanvas(worldX, worldY);
	
	
	// 오디오 엔진 
	initAudio();
	
	// 물리엔진 시작용
	engine = Engine.create();
	world = engine.world;
	ball = new Ball();
	initCollisions();
	
	//스코어랑 라벨 붙임용
	score = 0;
	newScore();
	
	//화면 크기를 기반으로 해서 열 및 행 간격 가져오기 바
	var colSpace = width / cols;
	var rowSpace = (height - ballRad - cupH) / rows;
	
	//파친코 스터드(Stud) 그리기
	for(var r = 0; r < rows; r ++){
		for(var c = 0; c < cols; c ++){
			var s;
			if(r % 2 == 0){
				s = new Stud((c * colSpace) + (0.8 * colSpace), (r * rowSpace) + (0.5 * rowSpace) + ballRad);
			} else {
				s = new Stud((c * colSpace) + (0.3 * colSpace), (r * rowSpace) + (0.5 * rowSpace) + ballRad);
			}
			studs.push(s);
		}
	}
	
	//받는 컵의 경계 일정히 그리기
	for(var i = 0; i < cols + 1; i++){
		var b;
		if(rows % 2 != 0){
			b = new Boundary((i * colSpace) + (0.8 * colSpace), height - 0.25 * cupH, studRad, 0.75 * cupH);
		} else {
			b = new Boundary((i * colSpace) + (0.3 * colSpace), height - 0.25 * cupH, studRad, 0.75 * cupH);
		}
		cups.push(new Cup(floor(random(100))-50, b.body.position.x + (colSpace/2), height - cupLabelSize, cupLabelSize, 255,255,255));
		bounds.push(b);
	}
	
	// 바닥 경계면용
	var b = new Boundary(width/2, height + 49, width, 100);
	bounds.push(b);
	
	// 벽 경게면용
	var LW = new Boundary(-50, height/2, 100, height);
	var RW = new Boundary(width + 50, height/2, 100, height);
	bounds.push(LW);
	bounds.push(RW);
}


//여태 한 거 다 화면에 종합해서 욱여넣음
function draw(){
	background(51);
	Engine.update(engine, 1000 / 40);
	ball.show();
	
	for (var i = 0; i < studs.length; i ++){
		studs[i].show();  
	}
	for (var i = 0; i < bounds.length; i ++){
		bounds[i].show();  
	}
	for (var i = 0; i < cups.length; i ++){
		cups[i].draw();  
	}
	scoreLabel.draw();  
	
}


//공 그리기용
function mousePressed() {
	if(!ball.dropped){
		ball.drop();
	}
}

function newScore(){
	scoreLabel = new Label("Score: "+ score, 10, scoreLabelSize, scoreLabelSize, 255,255,255);
}

function initCollisions(){
	
	Events.on(engine, 'collisionStart', function(event) {
		var pairs = event.pairs;
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i];
			var collisionFilter = pair.bodyA.collisionFilter['group'];
			var volume = Math.abs(0.2 * ((pair.collision['depth']* -1) + 2));
			if(collisionFilter == collider_wall){
				audio_contact_wall.play(0,1,volume);
			}
			if(collisionFilter == collider_stud){
				audio_contact_wall.play(0,1,volume*0.4);
				audio_contact_stud.play(0,1,volume);
			}
		}
	});
	
}

function initAudio(){
	audio_contact_wall = loadSound('assets/audio/ball_wall_2.mp3');
	audio_contact_stud = loadSound('assets/audio/ball_stud.mp3');
}