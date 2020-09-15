var dogImg,happyDogImg,database,foodS,foodStock;
var dog;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(600,600);
  
  dog = createSprite(200,200,10.10);
  dog.addImage("dog",dogImg);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);
  textSize(20);
  fill(0, 255, 55)
  stroke(0, 255, 55)
  strokeWeight(1)
  text("Note: Press UP_Arrow key to feed Drago milk!",50,50);
  text("Bottles Remaining:" + foodS,300,200);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happyDogImg);
  }
  
  console.log(foodS);
  drawSprites();
  
}

function readStock(data){
   foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0
  } else {
    x = x - 1
  }

  database.ref('/').update({
    Food : x
  })
}