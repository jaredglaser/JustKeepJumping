const MOVEMENT = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
  UP: 3,
  DOWN: 4
}

// sets up button listeners for instructions button and modal
$(function () {
  document.getElementById("instrBtn").addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "flex";
  });

  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".bg-modal").style.display = "none";
  });

});



function startGame() {

  document.getElementById("player").style.visibility = "visible";
  document.getElementById("pg-header").style.visibility = "hidden";

  var player1 = new Entity("player", entityType.PLAYER);
  var logicController1 = new LogicController();
  var engine1 = new Engine([player1], logicController1);
  window.addEventListener("keydown", function (event) {
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
  }, true);
  window.addEventListener("keyup", function (event) {
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
  }, true);
  engine1.init();
}



class LogicController {
  constructor() {
    this.lasttimestamp = 0;
    this.input = 0;
  }

  gameloop(timestamp, engineinstance) {
    var timeDifference = timestamp - this.lasttimestamp;
    this.lasttimestamp = timestamp;
    var generatePlatforms = false;
    if (engineinstance.entities.length == 1) { //was the game just started?
      generatePlatforms = true;
    }
    //first check if any of the platforms are past the 100px mark
    for (var i = 0; i < engineinstance.entities.length; i++) {
      var entity = engineinstance.entities[i];
      if (entity.elementid != "player" && this.y > 100 && this.alreadyfallen == false) {
        generatePlatforms = true;
        break;
      }
    }
    //now set the already fallen flag on all of them
    engineinstance.entities.map(function (x) {
      x.alreadyfallen = true;
      return x
    });
    //if new platforms need to be added, add them now
    if (generatePlatforms) {
      var testingplatformarray = [1, 1, 1, 0, 0, 1, 1, 0];
      for (i = 0; i < testingplatformarray.length * 100; i += 100) {
        //make a new div
        var id = this.create_UUID();
        $("#container").append("<div id=" + id + " class=platform></div>");
        var platform = new Entity(id, entityType.PLATFORM);
        platform.x = i;
        engineinstance.entities.push(platform);
      }
    }

    //randomly generate enemies when platforms are not being generated
    //Will have a 10% chance of generating
    if (!generatePlatforms) {
      if ((Math.floor(Math.random() * 10)) == 0) {
        var eid = this.create_UUID();
        $("#container").append("<div id=" + eid + " class=enemy></div>");
        var enemy = new Entity(eid);
        enemy.x = ((Math.floor(Math.random() * 7)) + 1) * 100;
        enemy.y = 400;
        engineinstance.entities.push(enemy);
      }
    }

    for (var i = 0; i < engineinstance.entities.length; i++) {
      var timefactor = timeDifference / 16.666;
      var entity = engineinstance.entities[i];
      if (entity.elementid == "player") {
        if (this.input == MOVEMENT.LEFT) {
          entity.ax = -1;
        }
        else if (this.input == MOVEMENT.RIGHT) {
          entity.ax = 1;
        }
        else if (this.input == MOVEMENT.UP) {
          document.getElementById(entity.elementid).style.width = "30px";
          document.getElementById(entity.elementid).style.height = "20px";
          entity.ay = -2;
        }
        else if (this.input == MOVEMENT.DOWN) {
          //idk
        }
        else {
          document.getElementById(entity.elementid).style.width = "25px";
          document.getElementById(entity.elementid).style.height = "25px";
          entity.ax = 0;
          entity.vx = 0;
        }
      }
      //Update the position
      entity.updateposition(timefactor);
      //Is it out of bounds?
      engineinstance.boundsDetection(entity);





      //TODO: need to figure out collisions here.

      //TODO: resolve the collisions here.
      var gamelogicinstance = this;
      requestAnimationFrame(function (timestamp) {
        gamelogicinstance.gameloop(timestamp, engineinstance);
      });
    }
    //TODO: need to figure out collisions here.


    //TODO: resolve the collisions here.
    var gamelogicinstance = this;
    requestAnimationFrame(function (timestamp) {
      gamelogicinstance.gameloop(timestamp, engineinstance);
    });
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