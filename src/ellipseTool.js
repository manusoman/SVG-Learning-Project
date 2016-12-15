"use strict";


(function(app) {
    
    app.ellipseTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    
    app.ellipseTool.pathObj = false;
    app.ellipseTool.IMD  = false; // IMD -> Is Mouse Down.
    
    
    
    app.ellipseTool.doTheJob = function() {
        
        if(this.mEventType === "mousedown") {
                
            if(!this.pathObj) {
                this.pathObj = app.canvas.manageObjGeneration("create", "ellipse");
            }

            this.pathObj.drawEllipse("center", this.currentCoord);
            this.IMD = true;

        } else if(this.mEventType === "mousemove") {
            
            if(this.IMD) {
                this.pathObj.drawEllipse("modify", this.generate_Drag_Rect_Data().splice(4, 4));
            }

        } else if(this.mEventType === "mouseup") {
            
            this.IMD = false;
            this.pathObj = false;

        } else {
            console.log("Custom Error: Couldn't recognize mouse event!");
        }
    };
    
})(window.app);