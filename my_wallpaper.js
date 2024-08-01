//your parameter variables go here!
let rect_width  = 200; //grid size
let rect_height = 200; // grid size

//Variables for flowers
//range 10 - 60 for optimal output
const FLOWERSIZES = [30,40,30];
//FLOWER OPTIONS ["poppy", "sunflower", "rose", "lily", "lotus", "orange", "purple"]
const FLOWERS = ["sunflower", "lotus", "orange"];
//OPTIONS - "SUNNY", "RAINY" 
const DAYTYPE = "RAINY";
// RGB
const WALLCOLOR = [50, 128, 128];
//RGB
const WINDOWTRIMCOLOR = [255,192,255];
//RGB
const SHELFCOLOR = [255,192,203];



//Variables for phone
// let phoneCountPerSquare = 300; // Number of phones to draw per square
// let rgbRange = [255,255,255];

//Variables for trip
// let columns = 20;              // Number of columns in the grid
// let rows = 20;                 // Number of rows in the grid
// let maxEllipseSize = 20;       // Maximum size of ellipses
// let colorVariation = 255;      // Color variation
// let offset = 10;               // Offset within each cell for randomness




function setup_wallpaper(pWallpaper) {
  // DEVELOP_GLYPH
  // GRID_WALLPAPER
  // GLIDE_WALLPAPER
  pWallpaper.output_mode(GLIDE_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = rect_width;
  pWallpaper.grid_settings.cell_height = rect_width;
  pWallpaper.grid_settings.row_offset  = 0;
}

function wallpaper_background() {
  background(WALLCOLOR[0],WALLCOLOR[1], WALLCOLOR[2]);
  //drawWindow(20,140);
  //drawWindow(550,140);
  //drawWindow(1100,140);
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  angleMode(RADIANS);
  //drawPhones();
  //drawFlowers();
  AcidTrip();  
}


/**
 * Draws 3 Flowers
 *
 * @param   sizes  Takes in array of 3 sizes range 5-50
 * @param   flowers  Takes in array of flowers
 */
function drawFlowers(){
  drawShelf(0, rect_width);

  drawFlowerPot(rect_height/5, rect_height/1.33333, FLOWERSIZES[0], FLOWERS[0]);
  drawFlowerPot(rect_height/2, rect_height/1.33333, FLOWERSIZES[1], FLOWERS[1]);
  drawFlowerPot(rect_height/1.25, rect_height/1.33333, FLOWERSIZES[2], FLOWERS[2]);
}

function drawWindow(x, y){

  push();
  translate(x,y);
  stroke(1);
  fill(WINDOWTRIMCOLOR[0],WINDOWTRIMCOLOR[1],WINDOWTRIMCOLOR[2]);
  rect(0,0, 320, 320);

  if(DAYTYPE == "SUNNY"){
    fill(135, 206, 235);
    rect(10,10, 300, 300);
  }else if(DAYTYPE == "RAINY"){
    fill(145,159,161);
    rect(10,10, 300, 300);
    drawCloud(100,100, 100);
    drawCloud(220,265,100);
  }

  fill(WINDOWTRIMCOLOR[0], WINDOWTRIMCOLOR[1], WINDOWTRIMCOLOR[2]);
  rect(150,10, 10, 300);
  rect(10,150, 300, 10);
  noStroke();
  pop();
}

function drawFlowerPot(x, y, size,flowerType) {

  //Pot Drawing ---
  stroke(1);
  // Set the color for the pot
  fill(153, 76, 0);
  
  // Draw the bottom ellipse of the pot
  ellipse(x, y, size, size / 3);
  
  // Draw the main body of the pot
  beginShape();
  vertex(x + size / 2, y);
  vertex(x + size / 2 + size / 5, y - size);
  vertex(x - size / 2 - size / 5, y - size);
  vertex(x - size / 2, y);
  endShape(CLOSE);
  
  // Draw the top ellipse of the pot
  ellipse(x, y - size + size/15, size + size / 2.5, size / 2); 
  fill(153, 76, 0);
  ellipse(x, y - size, size + size / 2.5, size / 2);
  fill(102, 51, 0);
  ellipse(x, y - size, size + size / 4, size / 3);

  //Flower Drawing ---

  // variables
  var numOfPedals = Math.random() * (10 - 4) + 4;
  var numOfLeafs = Math.random() * 30;

  fill(0, 200, 0);
  //DRAW STEM
  rect(x - size/16, y - size*2.5, size/8, size * 1.5, 3);

  //DRAW LEAF OR LEAFS
  if(numOfLeafs >= 20){
    //draw 2 leafs
    //draw left leaf
    push();
    var randomLeafPosY = Math.random() * (size/1.8);  
    translate(x - size/16, y - size*2.1 + randomLeafPosY);
    rotate(45);
    ellipse((size/8)*-1, 0, size/5, size/ 10);
    pop();
    //draw right leaf
    push();
    var randomLeafPosY = Math.random() * (size/1.8);  
    translate(x - size/16 + size/8, y - size*2.1 + randomLeafPosY);
    rotate(134);
    ellipse((size/8)*-1, 0, size/5, size/ 10);
    pop();
  }else{ // draws one leaf
    //draw left leaf
    push();
    var randomLeafPosY = Math.random() * (size/1.8);  
    translate(x - size/16, y - size*2.1 + randomLeafPosY);
    rotate(45);
    ellipse((size/8)*-1, 0, size/5, size/ 10);
    pop();

  }

  if(flowerType === "poppy"){
    drawpoppy(x, y - size*2.5, size, numOfPedals);
  }else if(flowerType === "sunflower"){
    drawFlower(x, y - size*2.5, size, Math.random() * (20 - 6) + 6 ,255, 204,0 );
  }else if(flowerType == "rose"){
    drawRose(x,y - size*2.5, size, numOfPedals);
  }else if(flowerType === "lily"){
    drawFlower(x, y - size*2.5, size, numOfPedals,224, 65, 203);
  }else if(flowerType == "lotus"){
    drawThreeColorFlower(x, y - size*2.5, size, numOfPedals, [255, 0, 127], [255, 153, 255], 255, 255, 0);
  }else if(flowerType == "orange"){
    drawThreeColorFlower(x, y - size*2.5, size, numOfPedals, [255, 69, 0], [255, 165, 0], [153, 101, 21]);
  }else if(flowerType == "purple"){
    drawThreeColorFlower(x, y - size*2.5, size, numOfPedals, [102, 0, 102], [204, 0, 204], [102, 204, 0]);
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
  fill(SHELFCOLOR[0],SHELFCOLOR[1],SHELFCOLOR[2]);
  rect(x,y, rect_height, rect_height/8);
  rect(x,y, rect_height, -rect_height/20);
  stroke(1);
  fill(0,0,0);
  rect(x, y+rect_height/8, rect_height,rect_height/40);
  fill(0,0,0);
  rect(x, y-rect_height/16, rect_height,rect_height/80);

  

}

function drawCloud(x, y, size) {
  fill(255); // Light gray color for the cloud
  noStroke();

  // Calculate the scale based on the size
  let scale = size / 20;

  // Draw a series of ellipses to form a cloud shape
  ellipse(x, y, 20 * scale, 12 * scale);        // Center ellipse
  ellipse(x - 8 * scale, y + 2 * scale, 12 * scale, 10 * scale); // Left ellipse
  ellipse(x + 8 * scale, y + 2 * scale, 12 * scale, 10 * scale); // Right ellipse
  ellipse(x, y - 5 * scale, 14 * scale, 10 * scale); // Top ellipse
}


function AcidTrip() {

  // Calculate the size of each cell
  let cellWidth = rect_width / 10;
  let cellHeight = rect_height / 10;

  columns = 10;
  rows = 10;

  colorVariation = 255;

  // Set up the canvas
  noStroke();
  //stroke(1);
  // Draw ellipses within each cell
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Random color for each ellipse
      fill(random(colorVariation), random(colorVariation), random(colorVariation), random(155, 255));
      
      // Calculate the center of the current cell
      let x = i * cellWidth + cellWidth / 2;
      let y = j * cellHeight + cellHeight / 2;
      
      // Apply random offset within the cell
      let offsetX = random(-10, 10);
      let offsetY = random(-10, 10);
      
      // Random size constrained by the cell size
      let size = random(50 / 2, 50);

      // Draw ellipse
      ellipse(x + offsetX, y + offsetY, 50, 50);
    }
  }
}

function drawPhones() {
  let size = 40; // Define the size for the phones
  let time = "12:00"; // Sample time for all phones
  let bgColor = [200, 220, 240]; // Sample background color for all phones

  // Center of the canvas
  let centerX = rect_width / 2;
  let centerY = rect_height / 2;

  // Number of layers of phones
  let layers = 8; // You can change this to add more layers

  let angleIncrement = TWO_PI / layers // Dividing the circle into 8 parts

  // Iterate over each layer
  for (let layer = 0; layer < layers; layer++) {
    // Calculate distance from the center for this layer
    let offset = (layer + 1) * size * 1.5;

    // Iterate over each angle position for this layer
    for (let i = 0; i < layers; i++) {
      let angle = i * angleIncrement;
      let x = centerX + cos(angle) * offset;
      let y = centerY + sin(angle) * offset;
      push();
      translate(x, y);
      rotate(angle);
      drawPhone(-size / 2, -size / 2, size, [50,120,180], time);
      pop();
    }
  }
}


function drawPhones() {
  for (let i = 0; i < phoneCountPerSquare; i++) {
    // Generate random position within the grid
    let x = random(0, rect_width);
    let y = random(0, rect_height);

    // Random size and background color
    let size = random(25, 125);
    let bgColor = [0,200,0]; //[random(rgbRange[0]), random(rgbRange[1]), random(rgbRange[2])];

    // Random rotation angle
    let angle = random(PI);

    // Random time generation
    let hours = nf(floor(random(24)), 2); // Format hours as two digits
    let minutes = nf(floor(random(60)), 2); // Format minutes as two digits
    let time = `${hours}:${minutes}`;

    // Save current state of canvas
    push();
    // Translate to the position and rotate
    translate(x, y);
    rotate(angle);
    drawPhone(0, 0, size, bgColor, time);
    // Restore previous state of canvas
    pop();
  }
}

function drawPhone(x,y, size, bgColor, time){
  let bgR = bgColor[0];
  let bgG = bgColor[1];
  let bgB = bgColor[2];

  //Draw Phone outline
  fill(101,115,126);
  rect(x-size/80,y-size/80,size/2.5, size/1.2903225806, size/40);
  fill(bgR,bgG,bgB);
  rect(x,y,size/2.666, size/1.3333, size/40);

  
  //Draw Camera 
  fill(0,0,0);
  rect(x+size/6.6666 ,y+size/80,size/13.333,size/40, size/50); // Slot
  fill(52,61,70);
  ellipse(x+size/4.8780487805,y+size/40,size/66.666,size/66.666); //Camera
  fill(101,101,101);
  ellipse(x+size/4.8661800487,y+size/39.2156862745,size/68.9655172414,size/68.9655172414); //Camera 
  

  //Draw time 
  fill(0,0,0);
  textSize(size/13.3333);
  text(time, x+size/10, y+size/6.666);

  //Draw Bottom Bar
  fill(255,254,254);
  rect(x+size/11.111 ,y+size/1.3793103448,size/5,size/80, size/50);

}