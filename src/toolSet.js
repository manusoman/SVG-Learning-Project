/* Define the action of each tool in the toolbox.

Each time a path element is selected, a wraper object for 
that element is created using the 'PathObject' constructor.
And as soon as the selection is removed, the object is destroyed. */

"use strict";


(function(app) {
    
    
    app.toolSet = {
        mEventTarget         : {},
        mEventType           : "",
        mEventShiftKey       : false,
        mEventCtrlKey        : false,
        mEventAltKey         : false,

        initialCoord         : false,
        currentCoord         : [],

        vertexClickTolerance : 5,
        dragSelectRect       : false,
        
    
    
        serveToolData : function(target, type, shiftKey, ctrlKey, altKey, coord) {

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

        },



        dragSelect : function() {

            if(this.mEventType === "mousedown") {

                this.dragSelectRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                app.canvas.element.appendChild(this.dragSelectRect);

            } else if(this.mEventType === "mousemove") {

                if(this.dragSelectRect) {
                    
                    let tmp = this.generate_Drag_Rect_Data();

                    this.dragSelectRect.setAttribute("x", tmp[0]);
                    this.dragSelectRect.setAttribute("y", tmp[1]);
                    this.dragSelectRect.setAttribute("width", tmp[2]);
                    this.dragSelectRect.setAttribute("height", tmp[3]);
                }

            } else if(this.mEventType === "mouseup") {

                if(this.dragSelectRect) {
                    app.canvas.element.removeChild(this.dragSelectRect);
                    this.dragSelectRect = false;
                }

            } else {
                console.log("Custom Error: No valid arguments!");
            }
        },
        
        
        
        generate_Drag_Rect_Data : function() {
            
            if(this.initialCoord && this.currentCoord) {

                let x = this.initialCoord[0],
                    y = this.initialCoord[1],
                    width  = this.currentCoord[0] - this.initialCoord[0],
                    height = this.currentCoord[1] - this.initialCoord[1];             

                if(width < 0) {
                    x = this.currentCoord[0];
                    width = Math.abs(width);
                }

                if(height < 0) {
                    y = this.currentCoord[1];
                    height = Math.abs(height);
                }
                
                return [x, y, width, height];
            }
        }

    };


})(window.app);