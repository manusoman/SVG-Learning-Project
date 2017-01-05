
(function(app) {
    
    "use strict";
    
    

    app.moveTool = Object.create(app.toolSet);
    // Creates Prototypal-Inheritance.
    
    
    app.moveTool.wasObjsDragged = false;    
    
    
    app.moveTool.doTheJob = function() {
        
        this[this.mEventType]();
    };    
    
    
    
    
    app.moveTool.mousedown = function() {

        if(this.mEventTarget === app.canvas.element) {

            app.canvas.manageObjGeneration("assign", false);

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
            
            let drag = this.generate_Drag_Vector();            
            let tmp = app.canvas.generate_SVGMatrix();
            tmp = tmp.translate(drag[0], drag[1]);
            
            this.transformer.transform(tmp);            
            this.wasObjsDragged = true;

        } else if(this.dragSelectRect) {

            this.dragSelect();

        } else {
            // Nothing happens here.
        }
    };
    
    
    
    
    app.moveTool.mouseup = function() {
            
        if(this.wasObjsDragged) { // Checks whether mouse was dragged.
            
            this.transformer.finishTransformation();
            this.wasObjsDragged = false;

        } else if(this.dragSelectRect) {
            this.dragSelect();
        } else {
            // Nothing happens here.
        }
    };
    
    
    
})(window.app);