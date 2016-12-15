"use strict";


(function(app) {
    
    app.lineTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    
    app.lineTool.pathObj     = false;
    app.lineTool.vertex      = false;
    app.lineTool.vertexCount = 0;
    
    
    app.lineTool.doTheJob = function() {
        
        if(this.mEventType === "mousedown") {
                
            if(!this.pathObj) {
                this.pathObj = app.canvas.manageObjGeneration("create", "path");
            }

            this.pathObj.drawPath("create", [false, this.currentCoord, false]);
            this.vertex = this.currentCoord;

        } else if(this.mEventType === "mousemove") {

            if(this.vertex) { // checks whether "mousedown" event happened before "mousemove".
                this.pathObj.drawPath("manip", [false, this.currentCoord, false]);
                this.vertex = this.currentCoord;
            }

        } else if(this.mEventType === "mouseup") {
            this.vertex = false;
            this.vertexCount++;

            if(this.vertexCount === 2) {
                this.pathObj = false;
                this.vertexCount = 0;
            }

        } else {
            console.log("Custom Error: Couldn't recognize mouse event!");
        }
        
    };
    
})(window.app);