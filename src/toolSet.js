/* Define the action of each tool in the toolbox.

Each time a path element is selected, a wraper object for 
that element is created using the 'PathObject' constructor.
And as soon as the selection is removed, the object is destroyed. */

"use strict";

app.toolSet = {
    mEventTarget         : {},
    mEventType           : "",
    mEventShiftKey       : false,
    mEventCtrlKey        : false,
    mEventAltKey         : false,
    
    initialCoord         : false,
    currentCoord         : [],
    
    vertexClickTolerance : 5,
    dragSelectRect       : false
};



(function(app) {
    
    
    app.toolSet.serveToolData = function(target, type, shiftKey, ctrlKey, altKey, coord) {
        
        this.mEventTarget   = target;
        this.mEventType     = type;
        this.mEventShiftKey = shiftKey;
        this.mEventCtrlKey  = ctrlKey;
        this.mEventAltKey   = altKey;
        this.currentCoord   = coord;
        
        if(type === "mousedown") {
            app.canvas.element.addEventListener("mousemove", window.app.canvas.handleEvent, false);
            this.initialCoord = coord;
        }
        
        if(type === "mouseup") {
            app.canvas.element.removeEventListener("mousemove", window.app.canvas.handleEvent, false);
            this.initialCoord = false;
        }
        
        switch(app.appUI.toolSelected) {
            case "moveTool":
                app.moveTool.doTheJob();
                break;
            case "polygonTool":
                app.polygonTool.doTheJob();
                break;
            case "penTool":
                app.penTool.doTheJob();
                break;
            case "lineTool":
                app.lineTool.doTheJob();
                break;
            default :
                alert("No tool was selected");
        }
    };
    
    
    
    app.toolSet.dragSelect = function(eType, SPC, EPC) {
        // SPC > Start Point Coordinate
        // EPC > End Point Coordinate
        
        if(eType === "mousedown") {
            
            this.dragSelectRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            app.canvas.element.appendChild(this.dragSelectRect);
            
        } else if(eType === "mousemove") {
            
            if(this.dragSelectRect) {
                
                let width = EPC[0] - SPC[0],
                    height = EPC[1] - SPC[1];                
                
                if(width < 0) {
                    width = Math.abs(width);
                    SPC[0] = EPC[0];
                }
                
                if(height < 0) {
                    height = Math.abs(height);
                    SPC[1] = EPC[1];
                }
                
                this.dragSelectRect.setAttribute("x", SPC[0]);
                this.dragSelectRect.setAttribute("y", SPC[1]);
                this.dragSelectRect.setAttribute("width", width);
                this.dragSelectRect.setAttribute("height", height);
            }
            
        } else if(eType === "mouseup") {
            
            if(this.dragSelectRect) {
                app.canvas.element.removeChild(this.dragSelectRect);
                this.dragSelectRect = false;
            }
            
        } else {
            console.log("Custom Error: No valid arguments!");
        }
        
        return this.dragSelectRect;
    };


})(window.app);