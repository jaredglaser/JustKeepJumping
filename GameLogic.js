const MOVEMENT = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
    DOWN: 4
}

$(function () {
    var player1 = new Entity("player");
    var logicController1 = new LogicController();
    var engine1 = new Engine( [ player1 ], logicController1);
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
});

class LogicController {
    constructor(){
        this.lasttimestamp = 0;
        this.input = 0;
    }

    gameloop(timestamp, engineinstance) {
        var timeDifference = timestamp - this.lasttimestamp;
        this.lasttimestamp = timestamp;
        var generatePlatforms = false;
        if(engineinstance.entities.length = 1){ //was the game just started?
            generatePlatforms = true;
        }
        //first check if any of the platforms are past the 100px mark
        for (var i = 0; i < engineinstance.entities.length; i++) {
            if(entity.elementid != "player" && this.y > 100 && this.alreadyfallen == false){
                generatePlatforms = true;
                break;
            }
        }
        //now set the already fallen flag on all of them
        engineinstance.entities.map(function(x) { 
            x.alreadyfallen = true; 
            return x
          });

        //if new platforms need to be added, add them now
        //TODO: actually do this

        for (var i = 0; i < engineinstance.entities.length; i++) {
            var timefactor = timeDifference/16.666;
            //TODO: actually figure out gravity here lol
            var entity = engineinstance.entities[i];

            entity.vy = 5; //default it to gravity

            if(entity.elementid == "player"){
                if(this.input == MOVEMENT.LEFT){
                    entity.vx = -5;
                }
                else if(this.input == MOVEMENT.RIGHT){
                    entity.vx = 5;
                }
                else if(this.input == MOVEMENT.UP){
                    entity.vy = -5;
                }
                else if(this.input == MOVEMENT.DOWN){
                    //idk
                }
            }
            entity.updateposition(timefactor);
        }
        //TODO: need to figure out collisions here.

        //TODO: resolve the collisions here.
        var gamelogicinstance = this;
        requestAnimationFrame(function(timestamp){
            gamelogicinstance.gameloop(timestamp, engineinstance);
        });
    }
}