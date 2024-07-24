//your parameter variables go here!
let rect_width  = 200;
let rect_height = 200;


function setup_wallpaper(pWallpaper) {
  // DEVELOP_GLYPH
  // GRID_WALLPAPER
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = rect_width;
  pWallpaper.grid_settings.cell_height = rect_height;
  pWallpaper.grid_settings.row_offset  = 0;
}

function wallpaper_background() {
  background(240, 255, 240); //light honeydew green colour
  drawWindow(20,140);
  drawWindow(550,140);
  drawWindow(1100,140);

}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  angleMode(RADIANS)
  drawFlowers();
}

function drawFlowers(){
  //Select Flowers
  const flowers = ["poppy", "sunflower", "rose", "lily", "lotus", "orange"];
  let flower1Index = Math.floor(Math.random()*flowers.length);
  let flower1 = flowers[flower1Index];
  flowers.splice(flower1Index, 1);
  let flower2Index = Math.floor(Math.random()*flowers.length);
  let flower2 = flowers[flower2Index];
  flowers.splice(flower2Index, 1);
  let flower3 = flowers[Math.floor(Math.random()*flowers.length)];

  let flower1Size = (Math.random() * (rect_height/4.44 - rect_height/6.66)) + rect_height/6.66;
  let flower2Size = (Math.random() * (rect_height/4.44 - rect_height/6.66)) + rect_height/6.66;
  let flower3Size = (Math.random() * (rect_height/4.44 - rect_height/6.66)) + rect_height/6.66;



  drawShelf(0, rect_width);

  drawFlowerPot(rect_height/5, rect_height/1.33333, flower1Size, flower1Size, "sunflower");
  drawFlowerPot(rect_height/2, rect_height/1.33333, flower2Size, flower2Size, "sunflower");
  drawFlowerPot(rect_height/1.25, rect_height/1.33333, flower3Size, flower3Size, "sunflower");
}

function drawWindow(x, y){
  push();
  translate(x,y);
  stroke(1);
  fill(101, 67, 33);
  rect(0,0, 320, 320);

  fill(135, 206, 235);
  rect(10,10, 300, 300);

  fill(139, 69, 19);
  rect(150,10, 10, 300);
  rect(10,150, 300, 10);
  noStroke();
  pop();
}

function drawFlowerPot(x, y, potSize, flowerSize, flowerType) {

  //Pot Drawing ---
  stroke(1);
  // Set the color for the pot
  fill(153, 76, 0);
  
  // Draw the bottom ellipse of the pot
  ellipse(x, y, potSize, potSize / 3);
  
  // Draw the main body of the pot
  beginShape();
  vertex(x + potSize / 2, y);
  vertex(x + potSize / 2 + potSize / 5, y - potSize);
  vertex(x - potSize / 2 - potSize / 5, y - potSize);
  vertex(x - potSize / 2, y);
  endShape(CLOSE);
  
  // Draw the top ellipse of the pot
  ellipse(x, y - potSize + potSize/15, potSize + potSize / 2.5, potSize / 2); 
  fill(153, 76, 0);
  ellipse(x, y - potSize, potSize + potSize / 2.5, potSize / 2);
  fill(102, 51, 0);
  ellipse(x, y - potSize, potSize + potSize / 4, potSize / 3);

  //Flower Drawing ---

  // variables
  var numOfPedals = Math.random() * (20 - 7) + 7;
  var numOfLeafs = Math.random() * 30;

  fill(0, 200, 0);
  //DRAW STEM
  rect(x - flowerSize/16, y - potSize*2.5, flowerSize/8, flowerSize * 1.5, 3);

  //DRAW LEAF OR LEAFS
  if(numOfLeafs >= 20){
    //draw 2 leafs
    //draw left leaf
    push();
    var randomLeafPosY = Math.random() * (flowerSize/1.8);  
    translate(x - flowerSize/16, y - flowerSize*2.1 + randomLeafPosY);
    rotate(45);
    ellipse((flowerSize/8)*-1, 0, potSize/5, potSize/ 10);
    pop();
    //draw right leaf
    push();
    var randomLeafPosY = Math.random() * (flowerSize/1.8);  
    translate(x - flowerSize/16 + flowerSize/8, y - flowerSize*2.1 + randomLeafPosY);
    rotate(134);
    ellipse((flowerSize/8)*-1, 0, potSize/5, potSize/ 10);
    pop();
  }else{ // draws one leaf
    //draw left leaf
    push();
    var randomLeafPosY = Math.random() * (flowerSize/1.8);  
    translate(x - flowerSize/16, y - flowerSize*2.1 + randomLeafPosY);
    rotate(45);
    ellipse((flowerSize/8)*-1, 0, potSize/5, potSize/ 10);
    pop();

  }

  if(flowerType === "poppy"){
    drawpoppy(x, y - potSize*2.5, flowerSize, numOfPedals);
  }else if(flowerType === "sunflower"){
    drawFlower(x, y - potSize*2.5, flowerSize, numOfPedals,255, 204,0 );
  }else if(flowerType == "rose"){
    drawRose(x,y - potSize*2.5, flowerSize, numOfPedals);
  }else if(flowerType === "lily"){
    drawFlower(x, y - potSize*2.5, flowerSize, numOfPedals,224, 65, 203);
  }else if(flowerType == "lotus"){
    drawThreeColorFlower(x, y - potSize*2.5, flowerSize, numOfPedals, [255, 0, 127], [255, 153, 255], 255, 255, 0);
  }else if(flowerType == "orange"){
    drawThreeColorFlower(x, y - potSize*2.5, flowerSize, numOfPedals, [255, 69, 0], [255, 165, 0], [153, 101, 21]);
  }


}

function drawFlower(x, y, size, numOfPetals, r,g,b) {
  let petalLength = size/2;
  let petalWidth = size/4;
  let angle = TWO_PI / numOfPetals;
  
  // Draw the petals
  noStroke();
  for (let i = 0; i < numOfPetals; i++) {
    let petalX = x + cos(angle * i) * petalLength;
    let petalY = y + sin(angle * i) * petalLength;
    push();
    translate(x, y);
    rotate(angle * i);
    fill(0, 0, 0); // black color for outline
    ellipse(petalLength / 2, 0, petalLength + (petalLength*0.01), petalWidth + (petalWidth*0.01));2
    fill(r, g, b); //color for petals
    ellipse(petalLength / 2, 0, petalLength, petalWidth);
    pop();
  }
  
  // Draw the center of the sunflower
  fill(102, 51, 0); // Brown color for center
  ellipse(x, y, petalWidth, petalWidth);
}

function drawpoppy(x, y, size, numOfPetals) {
  numOfPetals = numOfPetals/2;
  let petalLength = size/2;
  let petalWidth = size/2.5;
  let angle = TWO_PI / numOfPetals;

  // Draw the petals
  
  noStroke();
  for (let i = 0; i < numOfPetals; i++) {
    push();
    translate(x, y);
    rotate(angle * i);
    fill(0, 0, 0); // black color for outline
    ellipse(petalLength / 2, 0, petalLength + (petalLength*0.01), petalWidth + (petalWidth*0.01));
    fill(255, 0, 0); // Red color for petals
    ellipse(petalLength / 2, 0, petalLength, petalWidth);
    pop();
  }

  // Draw the center of the poppy
  fill(0); // Black color for the center
  ellipse(x, y, petalWidth / 2, petalWidth / 2);

  // Add some details to the center
  fill(255); // White color for details
  for (let i = 0; i < 10; i++) {
    let detailX = x + cos(TWO_PI / 10 * i) * (petalWidth / 4);
    let detailY = y + sin(TWO_PI / 10 * i) * (petalWidth / 4);
    ellipse(detailX, detailY, petalWidth / 10, petalWidth / 10);
  }
}

function drawRose(x, y, size, numOfPetals) {
  let petalLength = size / 2;
  let petalWidth = size / 3; // Slightly narrower petals than poppies
  let angle = TWO_PI / numOfPetals;

  // Draw the petals
  noStroke();
  for (let i = 0; i < numOfPetals; i++) {
    push();
    translate(x, y);
    rotate(angle * i);
    fill(50, 0, 0); // Dark red color for outline
    ellipse(petalLength / 2, 0, petalLength + (petalLength * 0.05), petalWidth + (petalWidth * 0.05));
    fill(200, 0, 0); // Lighter red color for petals
    ellipse(petalLength / 2, 0, petalLength, petalWidth);
    pop();
  }

  // Draw the center of the rose
  fill(100, 0, 0); // Dark red color for the center
  ellipse(x, y, petalWidth / 3, petalWidth / 3);

  // Add some details to the center
  fill(255, 200, 200); // Light color for details
  for (let i = 0; i < 10; i++) {
    let detailX = x + cos(TWO_PI / 10 * i) * (petalWidth / 6);
    let detailY = y + sin(TWO_PI / 10 * i) * (petalWidth / 6);
    ellipse(detailX, detailY, petalWidth / 15, petalWidth / 15);
  }
}

function drawThreeColorFlower(x, y, size, numOfPetals, rgb, rgb2, rgb3) {
  let petalLength = size / 2;
  let petalWidth = size / 3;
  numOfPedals = numOfPetals/2;
  let angle = TWO_PI / numOfPetals;

  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];

  let r2 = rgb2[0];
  let g2 = rgb2[1];
  let b2 = rgb2[2];

  let r3 = rgb3[0];
  let g3 = rgb3[1];
  let b3 = rgb3[2];



  // Draw the petals
  noStroke();
  for (let i = 0; i < numOfPetals; i++) {
    push();
    translate(x, y);
    rotate(angle * i);
    stroke(1);
    fill(r, g, b); // dark pink
    ellipse(petalLength / 2, 0, petalLength, petalWidth);
    pop();
  }
  for (let i = 0; i < numOfPetals; i++) {
    push();
    translate(x, y);
    rotate(angle * i);
    fill(r2, g2, b2); // Light whitey pink
    ellipse(petalLength/10, 0, petalLength, petalWidth);
    pop();
  }
  

  // Draw the center of the lotus
  stroke(1);
  fill(r3,g3,b3); // Yellow color for the center
  ellipse(x, y, petalWidth / 3, petalWidth / 3);

}

function drawShelf(x, y){

  y = y - rect_height / 4;

  //draw pillars
  fill(32,32,32);
  rect(rect_height/3.8714672861, 0, rect_height/50, rect_height);
  rect(rect_height/1.3453518095, 0, rect_height/50, rect_height);

  fill(255,255,255);
  for(let i = 0; i <= rect_height/5; i += rect_height/100){
    ellipse(rect_height/3.7313432836, i*rect_height/40,rect_height/80, rect_height/40);
  }
  for(let i = 0; i <= rect_height/5; i += rect_height/100){
    ellipse(rect_height/1.329787234, i*rect_height/40, rect_height/80, rect_height/40);
  }
  //Draw Self
  noStroke();
  fill(159,92,26);
  rect(x,y, rect_height, rect_height/8);
  rect(x,y, rect_height, -rect_height/20);
  stroke(1);
  fill(0,0,0);
  rect(x, y+rect_height/8, rect_height,rect_height/40);
  fill(0,0,0);
  rect(x, y-rect_height/16, rect_height,rect_height/80);

  

}
