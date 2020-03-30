class Engine {
    constructor(entities, logicController) {
        this.entities = entities;
        this.lasttimestamp = 0.0;
        this.logicController = logicController;
    }
    
    init() {
        var engineinstance = this;
        requestAnimationFrame(function(timestamp){
            engineinstance.logicController.gameloop(timestamp, engineinstance);
        });
    }

    collisionDetection(entity1, entity2) {

        //collect the values for each of the sides of the two entities.

        var left1 = entity1.left;
        var top1 = entity1.top;
        var right1 = entity1.right;
        var bottom1 = entity1.bottom;

        var left2 = entity2.left;
        var top2 = entity2.top;
        var right2 = entity2.right;
        var bottom2 = entity2.bottom;

        //if any of the edges of the first entity are past the ones of the second entity
        //then they have collided.
        if (bottom1 > top2) {
            return collisionType.ABOVE;
        }
        else if (top1 < bottom2) {
            return collisionType.BELOW;
        }
        else if (right1 > left2) {
            return collisionType.LEFT;
        }
        else if (left1 < right2) {
            return collisionType.RIGHT;
        }
        else {
            return null;
        }

    }

    boundsDetection(entity){
        //check out of bounds
        var element = document.getElementById(entity.id);
        if(entity.y >= $("#container").height() ) {
            if(entity.type == entityType.PLATFORM){
                //console.log("removing " + entity.id + " with x:" + entity.x + " and with y:" + entity.y);
                element.remove();
                this.entities.splice(this.entities.indexOf(entity),1);
            }
            else {
                for (var i = this.entities.length - 1; i > -1; i--) {
                    if (i != 0) {
                        document.getElementById(this.entities[i].id).remove();
                    }
                    this.entities.splice(this.entities.indexOf(this.entities[i]),1);
                }
                document.getElementById("GO-header").style.visibility = "visible";
                this.logicController.gameOver = true;
            }
        }
        if (entity.type == entityType.PLAYER) {
            if (entity.x >= $("#container").width() - 57) {
                entity.x = 0;
            }
            else if (entity.x <= 0) {
                entity.x = $("#container").width() - 57;
            }
        }
    }
}


