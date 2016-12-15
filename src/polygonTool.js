"use strict";


(function(app) {
    
    app.polygonTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    
    app.polygonTool.pathObj = false;
    app.polygonTool.IMD  = false; // IMD -> Is Mouse Down.
    
    
    
    app.polygonTool.doTheJob = function() {
        
        if(this.mEventType === "mousedown") {
                
            if(!this.pathObj) {
                this.pathObj = app.canvas.manageObjGeneration("create", "path");
            }

            this.pathObj.drawPath("create", [false, this.currentCoord, false]);
            this.IMD = true;

        } else if(this.mEventType === "mousemove") {

            if(this.IMD) { // checks whether "mousedown" event happened before "mousemove".
                this.pathObj.drawPath("manip", [false, this.currentCoord, false]);
            }

        } else if(this.mEventType === "mouseup") {
            this.IMD = false;

            if(this.pathObj.isClosedPath) {
                this.pathObj = false;
            }

        } else {
            console.log("Custom Error: Couldn't recognize mouse event!");
        }
    };
    
})(window.app);