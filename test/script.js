var po = {
    
    canvas : document.getElementById("svg"),
    
    atEvent : function() {
        this.canvas.addEventListener("mousedown", po.handleEvent, false);
        this.canvas.addEventListener("mouseup", po.handleEvent, false);
    },
    
    handleEvent : function(e) {
        e.stopPropagation();
        e.preventDefault();
    
        let a = po.canvas.getBoundingClientRect(),
			x = e.clientX - a.left,
			y = e.clientY - a.top;
        po.moveTool(e.type, e.target, x, y);
    },
    
    moveTool : function(type, target, x, y) {
        
        switch(type) {
            case "mousedown":
                if(target !== this.canvas) {
                    this.canvas.addEventListener("mousemove", this.handleEvent, false);
                    ele.setPivot(x, y);
                }
                break;

            case "mousemove":
                if(target !== this.canvas) {
                    ele.trnslt(x, y);
                }
                break;

            case "mouseup":
                this.canvas.removeEventListener("mousemove", this.handleEvent, false);
                break;

            default:
                console.log("nothing happened");
        }
    }  
};

po.atEvent();