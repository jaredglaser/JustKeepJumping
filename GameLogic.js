// sets up button listeners for instructions button and modal
$(function () {
  document.getElementById("instrBtn").addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "flex";
  });

  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "none";
  });

});

var tID; //we will use this variable to clear the setInterval()
function animateScript() {
  var position = 48; //start position for the image slicer
  const interval = 100; //100 ms of interval for the setInterval()
  tID = setInterval(() => {
    document.getElementById("player").style.backgroundPosition =
      `-${position}px 0px`;
    //we use the ES6 template literal to insert the variable "position"
    if (position < 144) { position = position + 48; }
    //we increment the position by 48 each time
    else { position = 48; }
    //reset the position to 48px, once position exceeds 1536px
  }
    , interval);
}

var tID2;
function animateShark() {
  var position = 100; //start position for the image slicer
  const interval = 100; //100 ms of interval for the setInterval()
  var allEnemies = document.getElementsByClassName("enemy");
  tID2 = setInterval(() => {

    for(var i = 0; i < allEnemies.length; i++){

      allEnemies[i].style.backgroundPosition = `-${position}px 0px`;
      //we use the ES6 template literal to insert the variable "position"
      if (position < 800) { position = position + 100; }
      //we increment the position by 100 each time
      else { position = 100; }
      //reset the position to 100px, once position exceeds 800px
    }
  }
    , interval);
}

var keydown;
var keyup;

function resetGame() {
  document.removeEventListener("keydown", keydown, true);
  document.removeEventListener("keyup", keyup, true);
  document.getElementById("GO-header").style.visibility = "hidden";
  startGame();
}

function startGame() {


  document.getElementById("player").style.visibility = "visible";
  document.getElementById("pg-header").style.visibility = "hidden";

  var player1 = new Entity("player", entityType.PLAYER);
  player1.visible = true;
  var logicController1 = new LogicController();
  lastLogicControllerReference = logicController1;
  logicController1.starttimestamp = event.timeStamp;
  var engine1 = new Engine([player1], logicController1);

  keydown = function (event) {
    animateScript();
    animateShark();
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown":
        logicController1.input = MOVEMENT.DOWN;
        break;
      case "ArrowUp":
        logicController1.input = MOVEMENT.UP;
        break;
      case "ArrowLeft":
        logicController1.input = MOVEMENT.LEFT;
        break;
      case "ArrowRight":
        logicController1.input = MOVEMENT.RIGHT;
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }
  keyup = function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown":
        logicController1.input = MOVEMENT.NONE;
        break;
      case "ArrowUp":
        logicController1.input = MOVEMENT.NONE;
        break;
      case "ArrowLeft":
        logicController1.input = MOVEMENT.NONE;
        break;
      case "ArrowRight":
        logicController1.input = MOVEMENT.NONE;
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }
  document.addEventListener("keydown", keydown, true);
  document.addEventListener("keyup", keyup, true);
  engine1.init();
}



class LogicController {
  constructor() {
    this.lasttimestamp = 0;
    this.starttimestamp = 0;
    this.lastSpawn = 0;
    this.input = 0;
    this.firstLoop = true;
    this.gameOver = false;
  }

  gameloop(timestamp, engineinstance) {
    var timeDifference = timestamp - this.lasttimestamp;
    this.lasttimestamp = timestamp;
    //update the score based on the time
    document.getElementById("score").innerText = "Score: " + Math.floor((timestamp-this.starttimestamp)/1000*10).toString();
    var generatePlatforms = (MAXPLAT > engineinstance.entities.length - 1) && (timestamp - this.lastSpawn > 200);
    if (this.firstLoop) { //was the game just started?
      for(var i = 0; i < MAXPLAT/2; i++){
        this.spawnEntities(engineinstance,true);
        this.spawnEntities(engineinstance,false);
      }
    }
    else {
        //if any platform is below the 100px mark, set its visibility to true
        engineinstance.entities.map(function (x) {
          if(x.y >= 100){
            x.visible = true;
            document.getElementById(x.id).style.visibility = "visible";
          }
        });
      //if new platforms need to be added, add them now
      if (generatePlatforms) {
        this.spawnEntities(engineinstance,false);
      }
    }

    //set colliding to false for the players
    engineinstance.entities[0].colliding = false;

    //perform collision check before accepting keyboard input
    for (var i = 0; i < engineinstance.entities.length; i++) {
      var entity = engineinstance.entities[i];
      //Now check collisions if they are not the player
      if (entity.type == entityType.PLATFORM) {
        var collision = engineinstance.entities[0].collided(entity, 5);
        if (collision == collisionType.ABOVE) {
          engineinstance.entities[0].colliding = true;
          engineinstance.entities[0].fixposition(entity);
        }
      }
      else if (entity.type == entityType.ENEMY) {
        var collision = engineinstance.entities[0].collided(entity, 5);
        if (collision == collisionType.ABOVE) {
          for (var i = engineinstance.entities.length - 1; i > -1; i--) {
            if (i != 0) {
                document.getElementById(engineinstance.entities[i].id).remove();
            }
            engineinstance.entities.splice(engineinstance.entities.indexOf(engineinstance.entities[i]),1);
          }
          document.getElementById("player").style.visibility = "hidden";
          document.getElementById("GO-header").style.visibility = "visible";
          this.gameOver = true;
        }
        if (collision == collisionType.FROMLEFT) {
          for (var i = engineinstance.entities.length - 1; i > -1; i--) {
            if (i != 0) {
                document.getElementById(engineinstance.entities[i].id).remove();
            }
            engineinstance.entities.splice(engineinstance.entities.indexOf(engineinstance.entities[i]),1);
          }
          document.getElementById("player").style.visibility = "hidden";
          document.getElementById("GO-header").style.visibility = "visible";
          this.gameOver = true;      
        }
        if (collision == collisionType.FROMRIGHT) {
          for (var i = engineinstance.entities.length - 1; i > -1; i--) {
            if (i != 0) {
                document.getElementById(engineinstance.entities[i].id).remove();
            }
            engineinstance.entities.splice(engineinstance.entities.indexOf(engineinstance.entities[i]),1);
          }
          document.getElementById("player").style.visibility = "hidden";
          document.getElementById("GO-header").style.visibility = "visible";
          this.gameOver = true;
        }
        if (collision == collisionType.BELOW) {
          for (var i = engineinstance.entities.length - 1; i > -1; i--) {
            if (i != 0) {
                document.getElementById(engineinstance.entities[i].id).remove();
            }
            engineinstance.entities.splice(engineinstance.entities.indexOf(engineinstance.entities[i]),1);
          }
          document.getElementById("player").style.visibility = "hidden";
          document.getElementById("GO-header").style.visibility = "visible";
          this.gameOver = true;
        }
      }
    }
    for (var i = 0; i < engineinstance.entities.length; i++) {
      var timefactor = timeDifference / 16.666;
      var entity = engineinstance.entities[i];
      if (entity.id == "player") {
        if (this.input == MOVEMENT.LEFT) {
          entity.ax = -1;
        }
        else if (this.input == MOVEMENT.RIGHT) {
          entity.ax = 1;
        }
        else if (this.input == MOVEMENT.UP) {
          //entity.jump();
        }
        else if (this.input == MOVEMENT.DOWN) {
          //idk
        }
        else {
          entity.ax = 0;
          entity.vx = 0;
        }
      }
      //Update the position
      if (!this.firstLoop) { //Ignore the first loop due to the first frame having a very large timefactor
        entity.updateposition(timefactor);
      }
      //Is it out of bounds?
      engineinstance.boundsDetection(entity);
    }


    //If this was the first frame, allow the following frames to update positions of entitites
    if (this.firstLoop) {
      this.firstLoop = false;
    }
    var gamelogicinstance = this;
    if (!this.gameOver) {
      requestAnimationFrame(function (timestamp) {
        gamelogicinstance.gameloop(timestamp, engineinstance);
      });
    }
  }

  spawnEntities(engineinstance,isFirst) {
    var screenWidth = ($("#container").width()-100);
    var screenHeight = ($("#container").height()-30);
    var ySelect;
    var xSelect;
    var id = this.create_UUID();
    for(var attempt = 0; attempt < 3 ; attempt++){ //try to find a location 10 times, if we can't then give up
      xSelect = Math.random()*screenWidth;
      ySelect = isFirst?1*(Math.random()*screenHeight):-1*(Math.random()*screenHeight);
      var tooclose = false;
      for(var i = 0; i < engineinstance.entities.length; i++){
          if(Math.abs((engineinstance.entities[i].x-(xSelect)) <= 100) &&
           Math.abs((engineinstance.entities[i].y)-(ySelect)) <=50){
            tooclose = true;
            break;
          }
      }
      if(!tooclose){ //we found a proper location
        break;
      }
      if(attempt == 2){
        return;
      }
    }
    $("#container").append($("<div></div>").attr({ "id": id, "class": "platform" }));
    var platform = new Entity(id, entityType.PLATFORM);
    platform.x = xSelect;
    platform.y = ySelect;
    var element = document.getElementById(id);
    element.style.top = toString(platform.y) + "px";
    element.style.left = toString(platform.x) + "px";
    element.style.visibility = "hidden";
    engineinstance.entities.push(platform);

    var sharkGen = Math.floor(Math.random()*25);
    if (sharkGen == 5) {
      var enemyId = this.create_UUID();
      $("#container").append($("<div></div>").attr({ "id": enemyId, "class": "enemy" }));
      var enemy = new Entity(enemyId, entityType.ENEMY);
      enemy.visible = true;
      var enemyArray = [screenHeight/2, screenHeight/4, (3*screenHeight/4)];
      var yEnemySelect = Math.floor(Math.random()*3);
      enemy.x = -100;
      enemy.y = enemyArray[yEnemySelect];
      engineinstance.entities.push(enemy);
    }
  }


create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
}