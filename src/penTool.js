
(function(app) {
    
    "use strict";
    
    
    
    app.penTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    app.penTool.pathObj = false;
    app.penTool.vertex  = false;
    
    
    
    app.penTool.doTheJob = function() {
        
        if(this.mEventType === "mousedown") {
                
            if(!this.pathObj) {
                this.pathObj = app.canvas.manageObjGeneration("create", "path");
            }

            this.pathObj.drawPath("create", [false, this.currentCoord, false]);
            this.vertex = this.currentCoord;

        } else if(this.mEventType === "mousemove") {

            if(this.vertex) { // checks whether "mousedown" event happened before "mousemove".
                let lcp = []; // lcp is left-control-point.

                lcp[0] = this.vertex[0] + (this.vertex[0] - this.currentCoord[0]);
                lcp[1] = this.vertex[1] + (this.vertex[1] - this.currentCoord[1]);

                this.pathObj.drawPath("manip", [lcp, this.vertex, this.currentCoord] );
            }

        } else if(this.mEventType === "mouseup") {
            this.vertex = false;

            if(this.pathObj.isClosedPath) {
                this.pathObj = false;
            }

        } else {
            console.log("Custom Error: Couldn't recognize mouse event!");
        }
        
    };
    
})(window.app);