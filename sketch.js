var PLAY=1;
var END=0;
var gameState=PLAY;
var mario, marioImg;
var marioEnd, marioEndImg
var ground, groundImg;
var brick,brickImg, bricksGroup;

var obstacles,obstaclesImg,obstaclesGroup;
var bg, bgImg;


var score=0;
var gameOverImg,restartImg;
var jumpSound , checkPointSound, dieSound;


function preload(){
    marioImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
    marioEndImg=loadAnimation("collided.png");
     groundImg=loadImage("ground2.png");
    obstaclesImg=loadImage("obstacle1.png","obstacle2.png","obstacle3.png");

    bgImg=loadImage("bg.png");

    brickImg=loadImage("brick.png");

    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameOver.png")

    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkPointSound = loadSound("checkPoint.mp3")
}

function setup(){
    createCanvas(600,300);

    bricksGroup= new Group();
    obstaclesGroup= new Group();

     bg=createSprite(300,150,600,10);
    bg.addImage(bgImg);

    mario=createSprite(30,225,10,50);
    mario.addAnimation("mario",marioImg);
    mario.addAnimation("marioEnd",marioEndImg);

    ground=createSprite(300,280,600,10);
    ground.addAnimation("ground",groundImg);


    //ground.velocityX=-7;
    ground.velocityX = -(6 + 3*score/100);

   mario.scale=1.5; 


    gameOver = createSprite(300,90);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300,140);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

}
function draw(){
   // background("blue");


    if(gameState===PLAY){
       mario.velocityY=mario.velocityY+1;

      score = score + Math.round(getFrameRate()/60);
      ground.velocityX = -(6 + 3*score/100);
     // obstacles.velocityX = -(6 + 3*score/100);

        if(ground.x<0){
        ground.x=ground.width/2;
      }

      if(keyDown("space")&& mario.y> 190){
        mario.velocityY=-15;
        jumpSound.play();

      }



      if(score>0 && score%100 === 0){
         checkPointSound.play() 
      } 
      

     

      
      mario.debug=true;
      //mario.setCollider("rectangle",0,0,20,20);
    spawnObstacles();
    spawnbricks();

       gameOver.visible = false;
      restart.visible = false;

       mario.changeAnimation("mario",marioImg);

     if(obstaclesGroup.isTouching(mario)){

             gameState=END;
            dieSound.play();
      }
     
      
     if(bricksGroup.isTouching(mario)){
        bricksGroup.removeSprites(brick);
        brick.visible=false;
     }
      

  }

      if(gameState===END){
         mario.velocityY=0;
      ground.velocityX=0;
      obstaclesGroup.setVelocityXEach(0);
      bricksGroup.setVelocityXEach(0);
      mario.changeAnimation("marioEnd",marioEndImg);

         obstaclesGroup.setLifetimeEach(-1);
      bricksGroup.setLifetimeEach(-1);

         gameOver.visible = true;
        restart.visible = true;


      if(mousePressedOver(restart)) {
        reset();
      }


    }

      mario.collide(ground);




     drawSprites();
    fill("blue");

     text("Score: "+ score, 20,50);
}

  function spawnObstacles(){
    if(frameCount%60===0){
    obstacles=createSprite(600,225,10,20);
    obstacles.addImage(obstaclesImg);
    obstacles.velocityX = -(6 + 3*score/100);
    obstaclesGroup.add(obstacles);
       }
}

function spawnbricks(){
  if(frameCount%60===0){
    brick=createSprite(600,150,20,20);
    brick.addImage(brickImg);
    brick.velocityX=-5;
    brick.y=Math.round(random(150,100));
    bricksGroup.add(brick);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  score = 0;
}