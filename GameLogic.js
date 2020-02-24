$(function () {
    var player1 = new Entity("player");
    var engine1 = new Engine( [ player1 ]);
    engine1.init();
});

function gameloop(timestamp, engineinstance) {
    //var timeDifference = timestamp - this.lasttimestamp;
    //this.lasttimestamp = timestamp;
    for (var i = 0; i < engineinstance.entities.length; i++) {
        //TODO: actually figure out gravity here lol
        var entity = engineinstance.entities[i];
        entity.vx += 1;
        entity.vy += 2;
        entity.x += 1;
        entity.y += 2;
        entity.updateposition();
    }
    //TODO: need to figure out collisions here.

    //TODO: resolve the collisions here.
    requestAnimationFrame(function(timestamp){
        gameloop(timestamp, engineinstance);
    });
}