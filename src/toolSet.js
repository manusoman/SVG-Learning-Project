/* Define the action of each tool in the toolbox.

Each time a path element is selected, a wraper object for 
that element is created using the 'PathObject' constructor.
And as soon as the selection is removed, the object is destroyed. */

"use strict";


(function(app) {
    
    
    app.toolSet = {
        
        activeTool           : false,
        
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
            
            
            app[this.activeTool].doTheJob();

        },



        dragSelect : function() {

            if(this.mEventType === "mousedown") {

                this.dragSelectRect = app.canvas.generate_SVG_Element("rect");
                app.canvas.append_SVG_Element(this.dragSelectRect, false);

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
                    app.canvas.remove_SVG_Element(this.dragSelectRect);
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
                    height = this.currentCoord[1] - this.initialCoord[1],
                    rx = width / 2,
                    ry = height / 2,
                    cx = x + rx,
                    cy = y + ry;

                if(width < 0) {
                    x = this.currentCoord[0];
                    width = Math.abs(width);
                    rx = Math.abs(rx);
                }

                if(height < 0) {
                    y = this.currentCoord[1];
                    height = Math.abs(height);
                    ry = Math.abs(ry);
                }
                
                return [x, y, width, height, cx, cy, rx, ry];
                // x      -> start 'x' point of the rectangle.
                // y      -> start 'y' point of the rectangle.
                // width  -> 'width' of the rectangle.
                // height -> 'height' of the rectangle.
                // cx     -> x coordinate of the center of the rectangle.
                // cy     -> y coordinate of the center of the rectangle.
                // rx     -> horizontal radius of the rectangle.
                // ry     -> vertical radius of the rectangle.
            }
        }

    };
    
    
    
    
    
    // This line tells the appUI object that the toolSet object
    // is created and ready for data transfer/reception.
    app.appUI.is_Tool_Set_Object_Ready = true;


})(window.app);