"use strict";

app.canvas = {
    element         : document.getElementById("Canvas"),

    width           : 800,
    height          : 600,
    BGC             : "#FFF",

    selectedObjects : false,
    objectList      : []	// an array of IDs for every object in the canvas.
};



(function(app) {

    app.canvas.element.setAttribute("width", app.canvas.width);
    app.canvas.element.setAttribute("height", app.canvas.height);
    app.canvas.element.style.backgroundColor = app.canvas.BGC;	


    app.canvas.handleEvent = function(e) {
        e.preventDefault();
        e.stopPropagation();

        let a = app.canvas.element.getBoundingClientRect(),
            x = e.clientX - a.left,
            y = e.clientY - a.top;
        
        app.toolSet.serveToolData(e.target, e.type, e.shiftKey, e.ctrlKey, e.altKey, [x, y]);
    };

    // Canvas event handlers start ***********************************************

    app.canvas.element.addEventListener("mousedown", window.app.canvas.handleEvent, false);
    app.canvas.element.addEventListener("mouseup", window.app.canvas.handleEvent, false);

    // Canvas event handlers end ***********************************************
    
    
    

    app.canvas.manageObjSelection = function(op, ele) {

        if(op === "+") { // Single object selection.
            
            if( !this.isExistingSelection(ele) ) {
                
                this.manageObjSelection(false);
                // Clears all the existing objects before a new selection is added.

                this.selectedObjects = [new app.PathObject("assign", ele)];
            }

        } else if(op === "++") { // Add object to existing selection.

            if(!this.selectedObjects) {
                
                this.selectedObjects = [new app.PathObject("assign", ele)];
                
            } else {
                
                if( !this.isExistingSelection(ele) ) {
                    this.selectedObjects.push(new app.PathObject("assign", ele));
                }
                
            }

        } else if(op === "--") { // Minus object from existing selection.

            if(this.selectedObjects) {
                
                let obj = this.isExistingSelection(ele);
                if(obj) {

                    obj.removeBossElement();
                    obj = null;

                    if(this.selectedObjects.length === 0) {
                        this.manageObjSelection(false);
                    }
                }
            }

        } else { // If no selection.

            if(this.selectedObjects) {
                let i, l = this.selectedObjects.length;
                for(i = 0; i < l; i++) {
                    this.selectedObjects[i].removeBossElement();
                    this.selectedObjects[i] = null;
                }
            }
            this.selectedObjects = false;
        }


        app.appUI.layerPalette.selectionUpdate();

        return this.selectedObjects;

    };
    
    
    
    
    // This function tells whether the object passed is already
    // selected or not.
    app.canvas.isExistingSelection = function(ele) {
        
        if(this.selectedObjects) {
            
            let i, l = this.selectedObjects.length;
            for(i = 0; i < l; i++) {
                if(ele === this.selectedObjects[i].bossElement) {

                    let n = this.selectedObjects.indexOf(this.selectedObjects[i]),
                        t = this.selectedObjects.splice(n, 1);

                    return t[0];
                }
            }
        }
        return false;
    };

})(window.app);