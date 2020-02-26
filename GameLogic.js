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
            // code for "down arrow" key press.
            break;
          case "ArrowUp":
            // code for "up arrow" key press.
            break;
          case "ArrowLeft":
            logicController1.input = -5;
            break;
          case "ArrowRight":
            logicController1.input = 5;
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
            // code for "down arrow" key press.
            break;
          case "ArrowUp":
            // code for "up arrow" key press.
            break;
          case "ArrowLeft":
            logicController1.input = 0;
            break;
          case "ArrowRight":
            logicController1.input = 0;
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
        for (var i = 0; i < engineinstance.entities.length; i++) {
            var timefactor = timeDifference/16.666;
            //TODO: actually figure out gravity here lol
            var entity = engineinstance.entities[i];
            entity.vx += 2*timefactor;
            entity.vy += 4*timefactor;
            entity.x += this.input;
            entity.y += 4*timefactor;
            entity.updateposition();
        }
        //TODO: need to figure out collisions here.

        //TODO: resolve the collisions here.
        var gamelogicinstance = this;
        requestAnimationFrame(function(timestamp){
            gamelogicinstance.gameloop(timestamp, engineinstance);
        });
    }
}