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
    
    
    

    app.canvas.manageObjGeneration = function(mode, opt, ele) {
    // Here, the 'opt' variable will be the 'type' if 'mode' is create and
    // it will be the 'operation' if 'mode' is assign.
        
        if(mode === "assign") {
            
            switch(opt) {

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
                            
                            t[0].remove_Edit_Group();
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
                            this.selectedObjects[i].remove_Edit_Group();
                            this.selectedObjects[i] = null;
                        }
                    }
                    this.selectedObjects = false;
                    break;
                    
                    
                default :
                    console.log("Custom Error: Operation is not specified!");
            }
            
            
            app.appUI.layerPalette.selectionUpdate();
            return this.selectedObjects;
            
            
        } else if(mode === "create") {
            
            app.canvas.manageObjGeneration("assign", false);
            //this function removes existing selected objects if there's any.
            
            let newObj = new app.PathObject(mode, opt);
            app.canvas.selectedObjects = [newObj];
            
            app.appUI.layerPalette.selectionUpdate();
            return newObj;
            
        } else {
            console.log("Custom Error: Mode is not specified!");
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
    
    
    
    
    app.canvas.generate_SVG_Element = function(type) {
        return document.createElementNS("http://www.w3.org/2000/svg", type);
    };
    
    
    
    app.canvas.append_SVG_Element = function(ele, parent) {
        
        if(!parent) {
            parent = this.element;
        }
        
        parent.appendChild(ele);
    };
    
    
    
    app.canvas.remove_SVG_Element = function(ele) {
        ele.parentNode.removeChild(ele);
    };
    
    

})(window.app);