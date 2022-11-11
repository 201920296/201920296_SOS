//JS 도움용 바
var w  = window,
    d  = w.document,
    de = d.documentElement,
    db = d.body || d.getElementsByTagName('body')[0],
    x  = w.innerWidth || de.clientWidth || db.clientWidth,
    y  = w.innerHeight|| de.clientHeight|| db.clientHeight;


//Matter Collision Filters
var collider_wall = 10;
var collider_stud = 5;
var collider_ball = 1;
    
// World Deminsions
var worldX = x;
var worldY = y;//900;

//Stud 그리드 바
var cols = 20;
var rows = 10;

// 오브젝트 사이즈 바
var cupH = 100;
var cupLabelSize = 24;
var scoreLabelSize = 32;
var ballRad = 20;
var studRad = 3;