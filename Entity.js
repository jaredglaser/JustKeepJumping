class Entity {
    constructor(id, type) {
        this.id = id;
        this.ay = GRAVITY;
        this.ax = 0;
        this.vx = 0;
        this.vy = 0;
        this.x = 0;
        this.y = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.alreadyfallen = false;
        this.type = type;
    }
    updateposition(timefactor) {
        var element = document.getElementById(this.id);

        //determine the new x and y
        this.vy = this.vy + (this.ay * timefactor);
        this.vx = this.vx + (this.ax * timefactor);
        this.x = this.x + (this.vx * timefactor);
        this.y = this.y + (this.vy * timefactor);
        this.limitspeed(this.id.includes("player"));
        this.correctsides();

    }
    limitspeed(isplayer){
        var maxspeed = isplayer?PLAYERGRAVITY:GRAVITY;
        if(this.vy < 0){
            this.vy = Math.max(this.vy,-1 * maxspeed);
        }
        else{
            this.vy = Math.min(this.vy, maxspeed);
        }

        if(this.vx < 0){
            this.vx = Math.max(this.vx,-1 * maxspeed);
        }
        else{
            this.vx = Math.min(this.vx, maxspeed);
        }
    }
    fixposition(platform) {
        var element = document.getElementById(this.id);
        this.vy = platform.vy;
        this.y = platform.y;
        this.correctsides();
    }
    correctsides() {
        var element = document.getElementById(this.id);
        //set the left, right, top, and bottom
        element.style.top = this.y + "px";
        element.style.left = this.x + "px";
        var width = parseInt(element.style.width);
        var height = parseInt(element.style.height);
        this.left = this.x;
        this.right = this.x + width;
        this.top = this.y;
        this.bottom = this.y + height;
    }
    collided(otherEntity, threshold) {
        //Handle directly above/below
        if (this.left > otherEntity.left && this.right < otherEntity.right) {
            //inside top side
            if (this.top < otherEntity.top && this.bottom > otherEntity.top) {
                return collisionType.ABOVE;
            }
            //inside bottom side
            else if (this.top > otherEntity.top && this.bottom < otherEntity.top) {
                return collisionType.BELOW;
            }
            //fully inside - treat as above
            else if (this.top > otherEntity.top && this.bottom < otherEntity.bottom) {
                return collisionType.ABOVE;
            }
        }
        //Handle touching left side 
        else if (this.left < otherEntity.left && this.right > otherEntity.left) {
            if (this.right - threshold > otherEntity.left) {
                if (this.top < otherEntity.top && this.bottom > otherEntity.top) {
                    return collisionType.ABOVE;
                }
                else if (this.top < otherEntity.bottom && this.bottom > otherEntity.bottom) {
                    return collisionType.BELOW;
                }
            }
            //handle barely inside the left, we dont want to count this as an above
            //check three conditions - partially above left , inside left, partially below left
            else if ((this.bottom > otherEntity.top && this.bottom < otherEntity.bottom) ||
                (this.top > otherEntity.top && this.bottom < otherEntity.bottom) ||
                (this.top < otherEntity.bottom && this.bottom > otherEntity.bottom)){
                return collisionType.FROMLEFT;
            }
        }
        //Handle touching right side
        else if (this.right > otherEntity.right && this.left < otherEntity.right) {
            if (this.left + threshold > otherEntity.right) {
                if (this.top < otherEntity.top && this.bottom > otherEntity.top) {
                    return collisionType.ABOVE;
                }
                else if (this.top < otherEntity.bottom && this.bottom > otherEntity.bottom) {
                    return collisionType.BELOW;
                }
            }
            //handle barely inside the right, we dont want to count this as an above
            //check three conditions - partially above right , inside right, partially below right
            else if ((this.top < otherEntity.top && this.bottom > otherEntity.top) ||
                (this.top > otherEntity.top && this.bottom < otherEntity.bottom) ||
                (this.top < otherEntity.bottom && this.bottom > otherEntity.bottom)) {
                return collisionType.FROMRIGHT;
            }
        }
        else {
            return collisionType.NONE;
        }
    }
}
