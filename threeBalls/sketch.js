let balls = [];
let ball_l = 80;//the diameter of balls
let wall; 
var counter = 0;  //clock
var timeSteps = []; //time step array
var wallPositions = []; //wall position array 
var microstate ='';

//data visualization interface
let Height = 240; //the size of the universe
let Width = 480;
var timeseriesWidth = Width/2; //the width of "time series box"
var timeseriesHeight = Height/2;//the height of "time series box"
var timeseriesUpperLeftX = Width; //the x value of the upper left corner of "time series box"
var timeseriesUpperLeftY = 0;  //the y value of the upper left corner of "time series box"


var histogramWidth = Width/2; //the width of "histogram box"
var histogramHeight = Height/2;//the height of "histogram box"
var histogramUpperLeftX = Width; //the x value of the upper left corner of "histogram box"
var histogramUpperLeftY = Height/2;  //the y value of the upper left corner of "histogram box"


function setup() {
  createCanvas(Width+timeseriesWidth, Height);
  wall = new Wall(width/2);//palce a bar at the middle 
  
  //for (let i = 0; i < 3; i++) {
  //  balls[i] = new Ball(random(width), random(height),random(10),random(10),10);
  //}
  let speed=3;
  balls[0] = new Ball(random(width/2), random(height),speed,speed,ball_l/4);
  balls[1] = new Ball(random(width/2,width), random(height),speed,speed,ball_l/4);
  balls[2] = new Ball(random(width/2,width), random(height),speed,speed,ball_l/4);
  
}

function draw() {
  
  background(240);
  counter+=1;
  
  //plot background lattice 
  stroke(100); 
  for (let x=0; x < Width/ball_l; x++){
    line(x*ball_l,0,x*ball_l,height);
    fill(200,10,10);
    if (x>0) {text(str(x),x*ball_l+3,height-5);}
  }
  for (let y=0; y<= height/ball_l; y++){
    line(0,y*ball_l,Width,y*ball_l);
  }
  

  wall.run();
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].run();
  }
  
  //collision between particles
  for (let i=0; i < balls.length; i++){
    for (let j=i+1; j< balls.length; j++){
      let d = p5.Vector.sub(balls[j].pos, balls[i].pos);
      let dis = d.mag();
      if (dis < (balls[i].r+balls[j].r)){//balls have contact so push back  
        //https://channel9.msdn.com/Series/Sketchbooktutorial/Simple-Collision-Detection-and-Response
        let normal = d.div(dis);
        let midpoint = p5.Vector.add(balls[i].pos, balls[j].pos).div(2);
        balls[i].pos = p5.Vector.sub(midpoint,p5.Vector.mult(normal,balls[i].r));
        balls[j].pos = p5.Vector.add(midpoint,p5.Vector.mult(normal,balls[j].r));
        let scale = p5.Vector.sub(balls[i].vel, balls[j].vel).dot(normal);
        let dv = p5.Vector.mult(normal,scale);
        balls[i].vel.sub(dv);
        balls[j].vel.add(dv);
      }
    }
  }
  
  // collision between particles and the bar
  for (let i=0; i< balls.length; i++){
    let dx = wall.x - balls[i].pos.x;
    if (abs(dx) < balls[i].r){//contact so push back
      let normal;
      if (dx > 0){normal = 1;} else {normal=-1;}
      let midpoint = (balls[i].pos.x + normal*balls[i].r+wall.x)/2;
      balls[i].pos.x = midpoint - normal*balls[i].r;
      wall.x = midpoint;
      //exchange velocity
      let pvx = balls[i].vel.x;
      let bvx = wall.vx;
      balls[i].vel.x = bvx;
      wall.vx = pvx;
    }  
  }
  
  //calculate total energy
  /*
  float E=0;
  for (int i=0; i<ps.length; i++){
    E += sq(ps[i].velocity.mag())/2;
  }
  E += sq(bar.velocity);
  */

  // encoding the microstates of system
  
  if (wall.x >= 0.5*ball_l & wall.x < 5.5*ball_l) {//legit wall area
      
    // discrete expression of ball position
    let xbar = round(wall.x/ball_l);
    let x1 = ceil(balls[0].pos.x/ball_l);
    let y1 = ceil(balls[0].pos.y/ball_l);
    let x2 = ceil(balls[1].pos.x/ball_l);
    let y2 = ceil(balls[1].pos.y/ball_l);
    let x3 = ceil(balls[2].pos.x/ball_l);
    let y3 = ceil(balls[2].pos.y/ball_l);
    
    
    //legit system state
    if (x1<=xbar & x2>=xbar & x3>=xbar & str(x2)+str(y2)!=str(x3)+str(y3)){
      
    microstate = str(xbar)+str(x1)+str(y1)+str(x2)+str(y2)+str(x3)+str(y3);
    //add a new data point (wall position) to time series
    timeSteps.push(counter);
    wallPositions.push(round(wall.x/ball_l));    
    }

  }
  
  
//-------------------time series box-------------------
  
  fill(255);
  strokeWeight(0.5);
  rect(timeseriesUpperLeftX,timeseriesUpperLeftY,timeseriesWidth,timeseriesHeight);
  fill(150);
  textSize(10);
  text("Time step = "+counter,timeseriesUpperLeftX+timeseriesWidth-80,timeseriesUpperLeftY+timeseriesHeight-10);//print time step
  text("Microstate = "+microstate, timeseriesUpperLeftX+timeseriesWidth/2, timeseriesUpperLeftY+10);//print microstate

  text("Wall location",timeseriesUpperLeftX+10,timeseriesUpperLeftY+10);
  for (let i=0; i<5; i++){
    text(str(i+1),timeseriesUpperLeftX+10,timeseriesHeight*(1-i/5)*5/6+3);
  }
  
  //obtain rescaled timeSteps and WallPositions for plotting
  var rescaledTimeSteps = [];
  var rescaledWallPositions = [];

  for (let i=0; i<timeSteps.length; i++){
    rescaledTimeSteps[i] = timeseriesUpperLeftX + timeseriesWidth * timeSteps[i]/timeSteps.length;
    let h = map(wallPositions[i], 1, 5, timeseriesHeight/6.0, 5*timeseriesHeight/6.0);
    rescaledWallPositions[i] = timeseriesUpperLeftY + timeseriesHeight - h; // inverse y direction
  }
  
  //draw lines connecting time points 
  if (rescaledTimeSteps.length>1){
    for (let i=0;i<rescaledTimeSteps.length-1; i++){
      let x1 = rescaledTimeSteps[i];
      let x2 = rescaledTimeSteps[i+1];
      let y1 = rescaledWallPositions[i];
      let y2 = rescaledWallPositions[i+1];
      strokeWeight(0.5);
      fill(100,100);
      //stroke(0, 35, 102,100);
      line(x1,y1,x2,y2);
      fill(200);
    }
  }
  
  
//-------------------histogram-------------------
  fill(255);
  rect(histogramUpperLeftX,histogramUpperLeftY,histogramWidth,histogramHeight);
  fill(150);
  text("Macrostate (wall location) distribution",histogramUpperLeftX+10,histogramUpperLeftY+20);
  
 
  //plot bars
  let histData = []; 
  for (let i=0;i<wallPositions.length; i++){ //the ith element belongs to the wallPositions[i] bin
  histData[wallPositions[i]-1]=0;
  }
  for (let i=0;i<wallPositions.length; i++){ //the ith element belongs to the wallPositions[i] bin
    
    histData[wallPositions[i]-1]+=1; //wallPositions[i] belongs to [1,5] but histData index starts from 0

  }
  for (let i=0;i<6;i++){
    let j=i+1;
    let h = histogramUpperLeftY * histData[i]/float(wallPositions.length);//probability
    fill(100);
    text(str(i+1),histogramUpperLeftX+j*histogramWidth/6-1.5, histogramUpperLeftY+histogramHeight-h-10)
    fill(200);
    rect(histogramUpperLeftX+j*histogramWidth/6, histogramUpperLeftY+histogramHeight-h, 3, h);
  }
  
  // plot theoretical curve
  let xs = [];
  let ys = [];
  let sumY = 0;
  for (let i=0;i<5; i++){
    let j=i+1;
    let y = 3*j*3*(6-j)*(3*(6-j)-1); // non finite-size effct 
    xs[i]=j;
    ys[i]=y;
    sumY+=y;
  }
  
  for (let i=0;i<5-1; i++){
    let x1 = map(xs[i],  0, 6, histogramUpperLeftX, histogramUpperLeftX+histogramWidth); //to reserve the empty spaces at the two sides 
    let x2 = map(xs[i+1],0, 6, histogramUpperLeftX, histogramUpperLeftX+histogramWidth); // we do not use ball_l, 5*ball_l as boundaries
    let y1 = map(1-ys[i]/sumY, 0, 1,  histogramUpperLeftY, histogramUpperLeftY+histogramHeight);
    let y2 = map(1-ys[i+1]/sumY,0,1,  histogramUpperLeftY, histogramUpperLeftY+histogramHeight);    
    
    strokeWeight(1);
    stroke(200,10,10);
    line(x1,y1,x2,y2);
    strokeWeight(5);
    
    point(x1,y1);
    point(x2,y2);
    stroke(100,100);
    strokeWeight(0.5);
  }    
  
  
  

}
  
class Ball {
  
  constructor(_x,_y, _vx,_vy, _r) {
    this.pos = createVector(_x, _y);
    this.vel = createVector(_vx, _vy);
    this.r = _r
  }
 
 update(){
    this.pos.add(this.vel);
  }

 checkBorder() { // bounce back when the ball hits the border
    if (this.pos.x < this.r) {this.pos.x = this.r; this.vel.x *= -1;} //left
    if (this.pos.x > Width-this.r){ this.pos.x = Width-this.r; this.vel.x *= -1; }  //right     
    if (this.pos.y < this.r){this.pos.y = this.r; this.vel.y *= -1;} //upper
    if (this.pos.y > height-this.r){this.pos.y = height-this.r; this.vel.y *= -1;} //lower
  }
 
 display() {
    stroke(0);
    fill(175);
    ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
  }
  
   run() {
    this.update();
    this.checkBorder();
    this.display();
  }
}


class Wall {
  
  constructor(_x) {
    this.x = _x;
    this.vx = 0;
  }
  
  run() {
    this.update();
    this.display();
  }
 
  update() {
    this.x += this.vx;
  }
  
  display() {
    stroke(0);
    strokeWeight(2);
    line(this.x,0,this.x,height);
    strokeWeight(1);
  }
  
}


