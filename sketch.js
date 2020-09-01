var healthy, healthyHouse, healthyImg, healthCDvar, healthCall, healthReject, healthAccept;
var temptation, tempatationHouse, tempatationImg, temptCD, temptationCall, temptationReject, temptationAccept;
var player, playerHouse, player1Img, player2Img, playerRightCD, playerLeftCD;
var accomplished, click, doorbell, hr, min, sec, accept, decline, callH, callT;


function preload() {
  healthyImg = loadImage("healthy.png");
  temptationImg = loadImage("temptation.jpg");
  player1Img = loadImage("player_avatar_1.jpg");
  player2Img = loadImage("player_avatar_2.jpg");

  doorbell = loadSound("doorbell.mp3");
  accomplished = loadSound("accomplished.mp3");
  click = loadSound("click.mp3");
}

function setup() {
  createCanvas(1200, 400);
  temptationCall = 'no';
  healthyCall = 'no';

  temptationReject = 'no';
  healthReject = 'no';

  temptationAccept = 'no';
  healthAccept = 'no';

  player = createSprite(600, 225, 50, 50);
  player.addImage("avatar1", player1Img);
  player.addImage("avatar2", player2Img);
  player.scale = 0.3;

  temptation = createSprite(1100, 225, 50, 50);
  temptation.addImage("tempt", temptationImg);
  temptation.scale = 0.12;
  
  healthy = createSprite(100, 225, 50, 50);
  healthy.addImage("healthy", healthyImg);
  healthy.scale = 0.14;
  
  temptCD = 125;
  healthCD = 125;
  playerRightCD = 125;
  playerLeftCD = 125;

  accept = createButton("Accept");
  accept.position(500, 375);
  accept.size(100, 100);
  accept.style('font-size', '20px');
  accept.style('background-color', 'green');
  accept.hide();

  decline = createButton("Decline");
  decline.position(625, 375);
  decline.size(100, 100);
  decline.style('font-size', '20px');
  decline.style('background-color', 'green');
  decline.hide();
  
  callH = createButton("callH");
  callH.position(100, 50);

  callT = createButton("callT");
  callT.position(1100, 50);
}

function draw() {
  background(255, 255, 255);  
  stroke(0);
  textSize(20);
 // text("Sounds from zapsplat.com")

 hr = hour();
 min = minute();
 sec = second();

 if (hr > 12) {
  text(hr%12 + ":", 20, 30);
  
  if (min < 10) {
    text("0" + min + " PM", 35, 30);
  } else {
    text(min + " PM", 35, 30);
  }
} else if (hr === 0) {
  text("12:", 20, 30);
  
  if (min < 10) {
    text("0" + min + " AM", 35, 30);
  } else {
    text(min + " AM", 35, 30);
  }
} else if (hr === 12) {
  text(hr + ":", 20, 30);
  
  if (min < 10) {
    text("0" + min + " PM", 35, 30);
  } else {
    text(min + " PM", 35, 30);
  }
} else {
  text(hr + ":", 20, 30);
  
  if (min < 10) {
    text("0" + min + " AM", 35, 30);
  } else {
    text(min + " AM", 35, 30);
  }
}

text("Messages: ", 20, 50);

if (temptation.x < 725 && temptation.x > 670) {
  message("tempt");
}

if (healthy.x > 470 && healthy.x < 550) {
  message("health");
}

if (healthy.x > 550) {
  acceptMessage("Do 10 push ups");
}

if (temptation.x < 670) {
  acceptMessage("Wanna have some ice cream?")
}

if (hr === 18 && min === 48 && sec === 0) {
healthCall = 'yes';
}

if (hr%2 === 0 && min === 30) {
  tempt();
}

callH.mousePressed(function() {
  healthCall = 'yes';
});

callT.mousePressed(function() {
  temptationCall = 'yes';
});

if (temptationCall === 'yes') {
  tempt();
}

if (healthCall === 'yes') {
  health();
}

decline.mousePressed(function () {
  if (temptation.x < 725) {
    temptationReject = 'yes';
  }

  if (healthy.x > 470) {
    healthReject = 'yes';
  }
});

if (temptationReject === 'yes') {
  rejectTempt();
}

if (healthReject === 'yes') {
  rejectHealth();
}

accept.mousePressed(function() {
  if (healthy.x > 470) {
    healthAccept = 'yes';
  }

  if (temptation.x < 725) {
    temptationAccept = 'yes';
  }
});

if (healthAccept === 'yes') {
  acceptHealth();
}

if (temptationAccept === 'yes') {
  acceptTempt();
}

 fill(0);
 line(500, 125, 700, 125);
 line(500, playerLeftCD, 500, 325);
 line(700, playerRightCD, 700, 325);
 line(500, 325, 700, 325);

 line(0, 125, 200, 125);
 line(0, 125, 0, 325);
 line(200, healthCD, 200, 325);
 line(0, 325, 200, 325);

 line(1000, 125, 1200, 125);
 line(1000, temptCD, 1000, 325);
 line(1200, 125, 1200, 325);
 line(1000, 325, 1200, 325);

 drawSprites();
}

function tempt() {
  if (temptCD < 325) {
    temptCD = temptCD + 5;
  }

  if (temptCD === 325) {
    temptation.velocityX = -2;
  }

  if (temptation.x < 725) {
    temptation.velocityX = 0;
    doorbell.play();
    temptationCall = 'no';
    accept.show();
    decline.show();
  }
}

function health() {
  if (healthCD < 325) {
    healthCD = healthCD + 5;
  }

  if (healthCD === 325 ) {
    healthy.velocityX = 2;
  }

  if (healthy.x > 470) {
    healthy.velocityX = 0;

    doorbell.play();
    healthCall = 'no';
    accept.show();
    decline.show();  }

 
}

function acceptTempt() {
  if (playerRightCD < 325) {
    playerRightCD = playerRightCD + 5;
  }

  if (playerRightCD === 325) {
    temptation.velocityX = -2;
    player.x = 600;
  }

  if (temptation.x < 660) {
    temptation.velocityX = 0;
    temptationAccept = 'no';
  }

  accept.hide();
  decline.hide();
}

function acceptHealth() {
  if (playerLeftCD < 325) {
    playerLeftCD = playerLeftCD + 5;
  }

  if (playerLeftCD === 325) {
    healthy.velocityX = 2;
    player.x = 610;
  }

  if (healthy.x > 550) {
    healthy.velocityX = 0;
    healthAccept = 'no';
  }

  accept.hide();
  decline.hide();
}

function rejectTempt() {
  if (temptation.x < 1100) {
    temptation.velocityX = 2;
   
  }

  if (temptation.x > 1100) {
    console.log('executed'); 
    temptation.velocityX = 0;
  }

  if (temptCD > 125 && temptation.x >= 1100) {
    temptCD = temptCD -5;
  }

  if (temptCD <= 125) {
    temptationReject = 'no';
  }

  accept.hide();
  decline.hide();
}
  

function rejectHealth() {
  if (healthy.x > 100) {
    healthy.velocityX = -2;
    console.log('done');  
  }

  if (healthy.x < 100) {
    healthy.velocityX = -0;
  }

  if (healthCD > 125 && healthy.x < 100) {
    healthCD = healthCD -5;
  }

  if (healthCD === 125) {
    healthReject = 'no';
  }

  accept.hide();
  decline.hide();
}

function message(name) {
  text("Your friend, " + name + " has come to visit.", 450, 350);
}

function acceptMessage(activity) {
  text(activity, 500, 350);
}