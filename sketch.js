var balloon,bgimg,balloonimg;
var database,position;

function preload(){
  bgimg=loadImage("images/Hot Air Ballon-01.png");
  balloonimg=loadImage("images/Hot Air Ballon-02.png");
}

function setup() {
  createCanvas(1300,700);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage("balloon1",balloonimg);
  balloon.scale=0.5;

  database=firebase.database();
  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",function(data){
    position=data.val();
    balloon.x=position.x;
    balloon.y=position.y;
  })
}

function draw() {
  background(bgimg);
  textSize(25); 
  text("** Use Arrow Keys to move Hot Air Balloon!",50,50);
  if(position!=undefined)
    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+10);
    } 
  drawSprites();
}

function changePosition(x,y){
  database.ref('balloon/position').set({
    x:position.x+x,
    y:position.y+y
  })
}