$(function () {
    var player1 = new Entity("player");
    var logicController1 = new LogicController();
    var engine1 = new Engine( [ player1 ], logicController1);
    engine1.init();
});

class LogicController {
    constructor(){
        this.lasttimestamp = 0;
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
        entity.x += 2*timefactor;
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