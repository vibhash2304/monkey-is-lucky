//variable to store game state
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score =0;
var ground;


function preload(){
  monkey_running =                    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");
   }

function setup() {
  monkey =createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  monkey.velocityX=2;
    
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
 
  FoodGroup = new Group();
  obstacleGroup = new Group();
  }

function draw() {
  background(180);
     
   if (monkey.isTouching(obstacleGroup)){
      gameState = END;
     }
    
   if(gameState === END){
      monkey.visible=false;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.velocityX = 0;
      obstacleGroup.VelocityX = 0;
     
      stroke ("black");
      textSize=60;
      fill("red");
      text ("Better luck next time...",175,175);
      text("Press r to restart..",180,200);
      }
   
     stroke("white");
     textSize=20;
     fill("white");
     text ("score:"+score,300,50);
  
      stroke ("black");
      textSize=20;
      fill("black");
    if (gameState === PLAY)
      {
      survivalTime=Math.ceil(frameCount/frameRate());
      }
    text("survivaltime:"+ survivalTime,100,50);
  
    if(keyDown("r")&&gameState===END){
      gameState=PLAY;
      monkey =createSprite(80,315,20,20);
      monkey.addAnimation("moving",monkey_running);
      monkey.scale=0.1;
      monkey.velocityX=2;
      score = 0;
      }
 
  bananas();
  obstacles();

  if(keyDown("space") && monkey.y>100) {
    monkey.velocityY = -13;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
 
  if (ground.x < 0){
    ground.x = ground.width/2;
    }
  if(monkey.x>400){
    monkey.x=0;
    }
  
  if(monkey.isTouching(FoodGroup) && gameState === PLAY){
      FoodGroup.destroyEach();
      score=score+1;
     }
  if(monkey.isTouching(obstacleGroup)){
      monkey.velocityY = -5;
     }
  monkey.collide(ground);
  drawSprites();
  }

function bananas(){
  if(frameCount%80===0){
    banana=createSprite(0,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(120,200));
    banana.velocityX=7;
    banana.setLifetime=100;
    FoodGroup.add(banana);
    }
  }

function obstacles(){
   if (frameCount % 175 === 0){
     obstacle = createSprite(200,325,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.lifetime = 300;

     //adding obstacles to the group
     obstacleGroup.add(obstacle);
     }
  }

  





