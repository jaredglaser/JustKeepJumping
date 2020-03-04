class Entity {
    constructor(id) {
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
    }
    updateposition(timefactor) {
        var element = document.getElementById(this.elementid);

        //determine the new x and y
        this.ay = this.ay + 1;
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
        //check out of bounds
        if(this.y >= 800 || this.x >= 800){
            element.style.top = "0px";
            element.style.left = "0px";
            this.x = 0;
            this.y = 0;
        }
    }
}
