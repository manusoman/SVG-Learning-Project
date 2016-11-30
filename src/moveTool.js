"use strict";


(function(app) {


    app.toolSet.moveTool = {

        initialCoord : [],
        wasObjsDragged : false,
        dragSelectRect : false, // Holds the rectangle for Drag-Selection
        

        doTheJob : function(target, type, shiftKey, ctrlKey, coord) {
            this[type](target, shiftKey, ctrlKey, coord);
        },
        
        

        mousedown : function(target, s, c, coord) {
            // !important : 'a' is a coordinate array.

            this.initialCoord = coord;

            if(target === app.canvas.element) {
                
                app.canvas.manageObjGeneration("assign", false);
                
                this.dragSelectRect = app.toolSet.dragSelect("mousedown");
                this.dragSelectRect.setAttribute("class", "moveToolDragSelection");
                
            } else {

                if(s) { // Checks whether Shift-key was pressed while event.
                    
                    app.canvas.manageObjGeneration("assign", "++", target);

                } else if(c) { // Checks whether Ctrl-key was pressed while event.
                    
                    app.canvas.manageObjGeneration("assign", "--", target);

                } else { // Makes a new selection.
                    
                    app.canvas.manageObjGeneration("assign", "+", target);
                }
            }
        },

        mousemove : function(target, s, c, coord) {
            
            if(app.canvas.selectedObjects) {
                
                let i, l = app.canvas.selectedObjects.length,
                    x = coord[0] - this.initialCoord[0],
                    y = coord[1] - this.initialCoord[1];

                for(i = 0; i < l; i++) {
                    app.canvas.selectedObjects[i].translate(x, y);
                }

                this.wasObjsDragged = true;
                
            } else if(this.dragSelectRect) {
                
                this.dragSelectRect = app.toolSet.dragSelect("mousemove",
                                                             this.initialCoord, coord);
                
            } else {
                // Here, nothing happens.
            }
        },

        mouseup : function() {
            
            if(this.wasObjsDragged) { // Checks whether mouse was dragged.
                
                let i, l = app.canvas.selectedObjects.length;			
                for(i = 0; i < l; i++) {
                    app.canvas.selectedObjects[i].initiate_Translation_Data();
                    app.canvas.selectedObjects[i].update_Element_Translation();
                }
                
                this.wasObjsDragged = false;
                
            } else if(this.dragSelectRect) {                
                this.dragSelectRect = app.toolSet.dragSelect("mouseup");
            }            
        }
    };
    
})(window.app);