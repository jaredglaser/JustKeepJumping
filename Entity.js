const entityType = {
    PLAYER: 0,
    PLATFORM: 1
}

class Entity {
    constructor(id,type) {
        this.elementid = id;
        this.ay = 0;
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
        var element = document.getElementById(this.elementid);

        //determine the new x and y
        if(this.type == entityType.PLAYER){
            this.ay = this.ay + 2;
        }
        else{
            this.ay = this.ay + 1;  
        }
     
        this.vy = this.vy + (this.ay * timefactor);
        this.vx = this.vx + (this.ax * timefactor);
        this.x = this.x + (this.vx*timefactor);
        this.y = this.y + (this.vy*timefactor);
        if (this.vy > 3) {
            this.vy = 3;
        }
        if (this.ay > 3) {
            this.ay = 3;
        }
        if (this.vx > 3) {
            this.vx = 3;
        }
        if (this.ax > 3) {
            this.ax = 3;
        }
        element.style.top = this.y + "px";
        element.style.left = this.x + "px";

        //set the left, right, top, and bottom
        var width = parseInt($('#' + this.elementid).css("width"));
        var height = parseInt($('#' + this.elementid).css("height"));
        this.left = this.x;
        this.right = this.x + width;
        this.top = this.y;
        this.bottom = this.y + height;
    }
    correctPosition(otherEntity){
        var element = document.getElementById(this.elementid);

        this.y = otherEntity.y + parseInt($('#' + this.elementid).css("height"));
        this.vy = otherEntity.vy;
        
        element.style.top = this.y + "px";
        element.style.left = this.x + "px";
    }
}
