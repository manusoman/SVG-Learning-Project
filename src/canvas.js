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
        
        app.toolset.serveToolData(e.target, e.type, e.shiftKey, e.ctrlKey, [x, y]);
    };

    // Canvas event handlers start ***********************************************

    app.canvas.element.addEventListener("mousedown", window.app.canvas.handleEvent, false);
    app.canvas.element.addEventListener("mouseup", window.app.canvas.handleEvent, false);

    // Canvas event handlers end ***********************************************

    app.canvas.manageObjSelection = function(a, b) {
        // 'a' is the operation & 'b' is the object.

        if(a === "+") { // Single object selection.
            app.canvas.manageObjSelection(false);
            // Clears all the existing objects before a new selection is added.

            app.canvas.selectedObjects = [b];

        } else if(a === "++") { // Add object to existing selection.

            if(!app.canvas.selectedObjects) {
                app.canvas.selectedObjects = [];
            }
            app.canvas.selectedObjects.push(b);

        } else if(a === "--") { // Minus object from existing selection.

            if(app.canvas.selectedObjects) {
                let i = app.canvas.selectedObjects.indexOf(b),
                    t = app.canvas.selectedObjects.splice(i, 1);
                
                t[0].removeBossElement();
                t[0] = null;

                if(app.canvas.selectedObjects.length === 0) {
                    app.canvas.manageObjSelection(false);
                }
            }

        } else { // If no selection.

            if(app.canvas.selectedObjects) {
                let i, l = app.canvas.selectedObjects.length;
                for(i = 0; i < l; i++) {
                    app.canvas.selectedObjects[i].removeBossElement();
                    app.canvas.selectedObjects[i] = null;
                }
            }
            app.canvas.selectedObjects = false;
        }


        app.appUI.layerPalette.selectionUpdate();

        return app.canvas.selectedObjects;

    };

})(window.app);