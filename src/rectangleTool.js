"use strict";


(function(app) {
    
    app.rectangleTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    
    app.rectangleTool.pathObj = false;
    app.rectangleTool.IMD  = false; // IMD -> Is Mouse Down.
    
    
    
    app.rectangleTool.doTheJob = function() {
        
        if(this.mEventType === "mousedown") {
                
            if(!this.pathObj) {
                this.pathObj = app.canvas.manageObjGeneration("create", "rect");
            }

            this.pathObj.drawRectangle("startPoint", this.currentCoord);
            this.IMD = true;

        } else if(this.mEventType === "mousemove") {
            
            if(this.IMD) {
                this.pathObj.drawRectangle("modify", this.generate_Drag_Rect_Data());
            }

        } else if(this.mEventType === "mouseup") {
            
            this.IMD = false;
            this.pathObj = false;

        } else {
            console.log("Custom Error: Couldn't recognize mouse event!");
        }
    };
    
})(window.app);