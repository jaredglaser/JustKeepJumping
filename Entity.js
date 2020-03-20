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
        this.colliding = false;
    }
    updateposition(timefactor) {
        var element = document.getElementById(this.id);

        //determine the new x and y
        this.ay = this.ay + 1;
        if (this.ay > 3) {
            this.ay = 3;
        }
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
        this.colliding = true;
        this.vy = platform.vy;
        this.y = platform.y + (platform.top - platform.bottom);
        this.correctsides();
    }
    correctsides() {
        var element = document.getElementById(this.id);
        //set the left, right, top, and bottom
        element.style.top = this.y + "px";
        element.style.left = this.x + "px";
        var width, height;
        switch(this.type){
            case entityType.PLATFORM:
                width = $(".platform").width();
                height = $(".platform").height();
                break;
            case entityType.PLAYER:
                width = $("#player").width();
                height = $("#player").height();
                break;
            default:
                break;
        }
        this.left = this.x;
        this.right = this.x + width;
        this.top = this.y;
        this.bottom = this.y + height;
    }
    collided(otherEntity, threshold) {

        if (this.x < otherEntity.x + (otherEntity.right-otherEntity.left) &&
            this.x + (this.right-this.left) > otherEntity.x &&
            this.y < otherEntity.y + (otherEntity.bottom-otherEntity.top) &&
            this.y + (this.bottom-this.top) > otherEntity.y) {
                if(this.bottom > otherEntity.top && this.vy > 0){ //cannot collide from above if you are going up.
                    return collisionType.ABOVE;
                }
         }
         return collisionType.NONE;
    }
    jump(){
        //check if you can jump
        //acceleration will be gravity if you are touching a platform
        if(this.colliding){
            //perform the jump
            document.getElementById(this.id).style.width = "30px";
            document.getElementById(this.id).style.height = "20px";
            this.ay = -5;
            //stop the jump after x seconds
            var player = this;
            setTimeout(function(){ 
                document.getElementById(player.id).style.width = "30px";
                document.getElementById(player.id).style.height = "20px";
                player.ay = PLAYERGRAVITY;
            }, 500);
            
        }
    }
}
