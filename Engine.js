class Engine {
    constructor(entities, logicController) {
        this.entities = entities;
        this.lasttimestamp = 0.0;
        this.logicController = logicController;
    }

    init() {
        var engineinstance = this;
        requestAnimationFrame(function (timestamp) {
            engineinstance.logicController.gameloop(timestamp, engineinstance);
        });
    }

    boundsDetection(entity) {
        //check out of bounds
        var element = document.getElementById(entity.id);
        if (entity.y >= $("#container").height() + 100) {
            if (entity.type == entityType.PLAYER) {
                for (var i = this.entities.length - 1; i > -1; i--) {
                    if (i != 0) {
                        document.getElementById(this.entities[i].id).remove();
                    }
                    this.entities.splice(this.entities.indexOf(this.entities[i]), 1);
                }
                document.getElementById("GO-header").style.visibility = "visible";
                this.logicController.gameOver = true;
            }
            else {
                element.remove();
                this.entities.splice(this.entities.indexOf(entity), 1);
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
        else if (entity.type == entityType.ENEMY) {
            if (entity.x >= $("#container").width() + 100) {
                element.remove();
                this.entities.splice(this.entities.indexOf(entity), 1);
            }
        }
    }
}


