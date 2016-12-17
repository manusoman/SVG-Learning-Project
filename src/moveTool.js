"use strict";


(function(app) {

    app.moveTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    
    app.moveTool.bossElement = false;
    app.moveTool.wasObjsDragged = false;
    
    
    
    app.moveTool.doTheJob = function() {
        this[this.mEventType]();
    };    
    
    
    
    
    app.moveTool.mousedown = function() {

        if(this.mEventTarget === app.canvas.element) {

            app.canvas.manageObjGeneration("assign", false);
            this.removeBossElement();

            this.dragSelect();
            this.dragSelectRect.setAttribute("class", "moveToolDragSelection");

        } else {

            if(this.mEventShiftKey) { // Checks whether Shift-key was pressed while event.

                app.canvas.manageObjGeneration("assign", "++", this.mEventTarget);

            } else if(this.mEventCtrlKey) { // Checks whether Ctrl-key was pressed while event.

                app.canvas.manageObjGeneration("assign", "--", this.mEventTarget);

            } else { // Makes a new selection.

                app.canvas.manageObjGeneration("assign", "+", this.mEventTarget);
            }
        }
    };
    
    
    
    
    app.moveTool.mousemove = function() {
            
        if(app.canvas.selectedObjects) {

            let i, l = app.canvas.selectedObjects.length,
                x = this.currentCoord[0] - this.initialCoord[0],
                y = this.currentCoord[1] - this.initialCoord[1];

            for(i = 0; i < l; i++) {
                app.canvas.selectedObjects[i].translate(x, y);
            }

            this.wasObjsDragged = true;

        } else if(this.dragSelectRect) {

            this.dragSelect();

        } else {
            // Nothing happens here.
        }
    };
    
    
    
    
    app.moveTool.mouseup = function() {
            
        if(this.wasObjsDragged) { // Checks whether mouse was dragged.

            let i, l = app.canvas.selectedObjects.length;			
            for(i = 0; i < l; i++) {
                app.canvas.selectedObjects[i].initiate_Translation_Data();
                app.canvas.selectedObjects[i].update_Element_Translation();
            }

            this.wasObjsDragged = false;

        } else if(this.dragSelectRect) {
            this.dragSelect();
        }            
    };
    
    
    
    
    app.moveTool.createBossElement = function() {
        
        this.bossElement = app.canvas.generate_SVG_Element("g");
        app.canvas.append_SVG_Element(this.bossElement);
    };
    
    
    
    
    app.moveTool.removeBossElement = function() {
        
        if(this.bossElement) {
            app.canvas.remove_SVG_Element(this.bossElement);
        }
    };
    
    
    
})(window.app);