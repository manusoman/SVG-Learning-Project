"use strict";

app.canvas = {
    spc : [],
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
        
        
        /*if(e.type === "mousedown") {
            app.canvas.spc = [x, y];
        }
        console.clear();
        console.log(app.canvas.spc);
        console.log([x, y]);*/
        
        app.toolSet.serveToolData(e.target, e.type, e.shiftKey, e.ctrlKey, e.altKey, [x, y]);
    };
    
    
    

    // Canvas event handlers start ***********************************************

    app.canvas.element.addEventListener("mousedown", window.app.canvas.handleEvent, false);
    app.canvas.element.addEventListener("mouseup", window.app.canvas.handleEvent, false);

    // Canvas event handlers end ***********************************************
    
    
    

    app.canvas.manageObjGeneration = function(mode, op, ele) {
        
        if(mode === "assign") {
            
            switch(op) {

                case "+": // Single object selection.

                    if( !this.isExistingSelection(ele) ) {

                        this.manageObjGeneration("assign", false);
                        // Clears all the existing objects before a new selection is added.

                        this.selectedObjects = [new app.PathObject(mode, ele)];
                    }
                    break;

                case "++": // Add object to existing selection.

                    if(!this.selectedObjects) {

                        this.selectedObjects = [new app.PathObject(mode, ele)];

                    } else {

                        if( !this.isExistingSelection(ele) ) {
                            this.selectedObjects.push(new app.PathObject(mode, ele));
                        }
                    }
                    break;

                case "--": // Minus object from existing selection.

                    if(this.selectedObjects) {

                        let obj = this.isExistingSelection(ele);
                        if(obj) {
                            
                            let n = this.selectedObjects.indexOf(obj),
                            t = this.selectedObjects.splice(n, 1);
                            
                            t[0].removeBossElement();
                            t[0] = null;

                            if(this.selectedObjects.length === 0) {
                                this.manageObjGeneration("assign", false);
                            }
                        }
                    }
                    break;

                case false : // If no selection.

                    if(this.selectedObjects) {
                        let i, l = this.selectedObjects.length;
                        for(i = 0; i < l; i++) {
                            this.selectedObjects[i].removeBossElement();
                            this.selectedObjects[i] = null;
                        }
                    }
                    this.selectedObjects = false;
                    break;
                    
                    
                default :
                    console.log("Operation is not specified!");
            }
            
            
            app.appUI.layerPalette.selectionUpdate();
            return this.selectedObjects;
            
            
        } else if(mode === "create") {
            
            app.canvas.manageObjGeneration("assign", false);
            //this function removes existing selected objects if there's any.
            
            let newObj = new app.PathObject(mode);
            app.canvas.selectedObjects = [newObj];
            
            app.appUI.layerPalette.selectionUpdate();
            return newObj;
            
        } else {
            console.log("Mode is not specified!");
        }

    };
    
    
    
    
    // This function tells whether the object passed is already
    // selected or not.
    app.canvas.isExistingSelection = function(ele) {
        
        if(this.selectedObjects) {
            
            let i, l = this.selectedObjects.length;
            for(i = 0; i < l; i++) {
                if(ele === this.selectedObjects[i].pathEditline) {
                    
                    return this.selectedObjects[i];
                }
            }
        }
        return false;
    };

})(window.app);