"use strict";


(function(app) {
    
    app.polygonTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    
    app.polygonTool.pathObj = false;
    app.polygonTool.vertex  = false;
    
    
    
    app.polygonTool.doTheJob = function() {
        
        if(this.mEventType === "mousedown") {
                
            if(!this.pathObj) {
                this.pathObj = app.canvas.manageObjGeneration("create");
            }

            this.pathObj.draw("create", [false, this.currentCoord, false]);
            this.vertex = this.currentCoord;

        } else if(this.mEventType === "mousemove") {

            if(this.vertex) { // checks whether "mousedown" event happened before "mousemove".
                this.pathObj.draw("manip", [false, this.currentCoord, false]);
                this.vertex = this.currentCoord;
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