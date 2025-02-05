class Entity {
    constructor(id, type) {
        this.id = id;
        this.ay = 0;
        this.ax = 0;
        this.vx = 0;
        this.vy = 0;
        this.x = $("#container").width()/2;
        this.y = ($("#container").height()/2) - 100;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.alreadyfallen = false;
        this.type = type;
        this.colliding = false;
        this.visible = false;
    }
    updateposition(timefactor) {
        var element = document.getElementById(this.id);

        if (this.type == entityType.ENEMY) {
            this.vx = 10;
        }
        //determine the new x and y
        else if (this.type == entityType.PLAYER) {
                this.ay = this.ay + .6;
        }
        else {
                this.ay = this.ay + .5;
        }
        this.vy = this.vy + (this.ay * timefactor);
        this.vx = this.vx + (this.ax * timefactor);
        this.x = this.x + (this.vx * timefactor);
        this.y = this.y + (this.vy * timefactor);
        this.limitspeed(this.id.includes("player"));
        this.correctsides();

    }
    limitspeed(isplayer){
        var maxdownspeed = isplayer?PLAYERGRAVITY:GRAVITY;
        var maxspeed = isplayer?-PLAYERMAX:-GRAVITY;
        if(this.ay < 0){
            if (this.ay > maxspeed) this.ay = this.ay;
            else this.ay = maxspeed;
        }
        else{
            if (this.ay < maxdownspeed) this.ay = this.ay;
            else this.ay = maxdownspeed;
        }

        if(this.vy < 0){
            if (this.vy > maxspeed) this.vy = this.vy;
            else this.vy = maxspeed;
        }
        else{
            if (this.vy < maxdownspeed) this.vy = this.vy;
            else this.vy = maxdownspeed;
        }
        if(isplayer){
        if(this.vx < 0){
            if (this.vx > maxspeed) this.vx = this.vx;
            else this.vx = maxspeed;
        }
        else{
            if (this.vx < -1 * maxspeed) this.vx = this.vx;
            else this.vx = -1 * maxspeed;
        }
    }

        
    }
    fixposition(platform) {
        this.colliding = true;
        this.vy = platform.vy;
        this.y = platform.y + (platform.top - platform.bottom);
        this.correctsides();
        this.jump();
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
            case entityType.ENEMY:
                width = $(".enemy").width();
                height = $(".enemy").height();
                break;
                case entityType.COIN:
                    width = $(".coin").width();
                    height = $(".coin").height();
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
         //make sure that they can collide
         if(!this.visible || !otherEntity.visible){
            return collisionType.NONE;
        }

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
            this.ay = -30;
            //stop the jump after x seconds
            var player = this;
            setTimeout(function(){ 
                player.ay = PLAYERGRAVITY;
            }, 500);
        }
    }
}
