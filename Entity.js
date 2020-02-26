class Entity {
    constructor(id) {
        this.elementid = id;
        this.vx = 0;
        this.vy = 0;
        this.x = 0;
        this.y = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    }
updateposition(timefactor) {
        var element = document.getElementById(this.elementid);

        //determine the new x and y
        this.x = this.x + (this.vx*timefactor);
        this.y = this.y + (this.vy*timefactor);
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
