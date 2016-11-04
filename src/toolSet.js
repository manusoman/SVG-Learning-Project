/* Define the action of each tool in the toolbox.

Each time a path element is selected, a wraper object for 
that element is created using the 'PathObject' constructor.
And as soon as the selection is removed, the object is destroyed. */

"use strict";

app.toolSet = {
    moveTool               : {},
    polygonTool            : {},
    lineTool               : {},
    vertexClickTolerance   : 5
};



(function(app) {

// Move Tool Definition Starts ***************************


    app.toolSet.moveTool = {

        /* Each time a path element is selected, a wraper object for 
        that element is created using the 'PathObject' constructor.
        And as soon as the selection is removed, the object is destroyed. */

        /* MoveTool attaches a 'mousemove' event to the canvas element between
        a 'mousedown' and 'mouseup' event on it. This prevents the objects from
        getting dragged by other tools as the 'mousemove' event exists only when
        moveTool is active. */

        initialCoord : [],

        doTheJob : function(target, type, shiftKey, ctrlKey, coord) {
            this[type](target, shiftKey, ctrlKey, coord);
        },

        mousedown : function(target, s, c, a) {
            // !important : 'a' is a coordinate array.

            this.initialCoord = a;
            app.canvas.element.addEventListener("mousemove", window.app.canvas.handleEvent, false);

            if(target === app.canvas.element) {
                app.canvas.manageObjSelection(false);
            } else {

                if(s) { // Checks whether Shift-key was pressed while event.
                    let i, l, f = false;

                    // This if block checkes whether the target was already selected by
                    // comparing the target with the object in the 'selectedObjs' list.
                    // If yes, it blocks the function from creating another duplicate
                    // object for the same element.
                    if(app.canvas.selectedObjects) {
                        l = app.canvas.selectedObjects.length;
                        for(i = 0; i < l; i++) {
                            if(app.canvas.selectedObjects[i].element === target) {
                                f = true;
                                break;
                            }
                        }
                    }

                    if(!f) {
                        app.canvas.manageObjSelection("++", new app.PathEditLine("assign", target));
                    }

                } else if(c) { // Checks whether Ctrl-key was pressed while event.
                    let i, tmp = app.canvas.selectedObjects.length;
                    for(i = 0; i < tmp; i++) {
                        if(target === app.canvas.selectedObjects[i].element) {
                            app.canvas.manageObjSelection("--", app.canvas.selectedObjects[i]);
                            break;
                        }
                    }

                } else { // Makes a new selection.

                    let i, l, f = false;

                    // This if block checkes whether the target was already selected by
                    // comparing the target with the object in the 'selectedObjs' list.
                    // If yes, the function does nothing.
                    if(app.canvas.selectedObjects) {
                        l = app.canvas.selectedObjects.length;
                        for(i = 0; i < l; i++) {
                            if(app.canvas.selectedObjects[i].element === target) {
                                f = true;
                                break;
                            }
                        }
                    }

                    if(!f) {
                        app.canvas.manageObjSelection("+", new app.PathEditLine("assign", target));
                    }
                }
            }
        },

        mousemove : function(target, s, c, a) {
            let i, l = app.canvas.selectedObjects.length,
                x = a[0] - this.initialCoord[0],
                y = a[1] - this.initialCoord[1];

            for(i = 0; i < l; i++) {
                app.canvas.selectedObjects[i].translate(x, y);
            }
        },

        mouseup : function() {
            let i, l = app.canvas.selectedObjects.length;			
            for(i = 0; i < l; i++) {
                app.canvas.selectedObjects[i].initiate_Translation_Data();
            }

            app.canvas.element.removeEventListener("mousemove", window.app.canvas.handleEvent, false);
        }
    };

// Move Tool Definition Ends ***************************



// Polygon Tool Definition Starts ***************************

    app.toolSet.polygonTool = {
        pathObj : false,
        initialCoord : [],

        doTheJob : function(type, a) {

            if(type === "mouseup") {

                if(this.pathObj) {
                    
                    if(app.toolSet.checkPathCompletion(this.initialCoord, a)) {
                        this.pathObj.draw("Z", a);
                        this.pathObj = false;
                    } else {
                        this.pathObj.draw("L", a);
                    }
                    
                } else {
                    app.canvas.manageObjSelection(false);
                    //this function removes existing selected objects if there's any.
                    
                    this.initialCoord = a;

                    this.pathObj = new app.PathEditLine("create");
                    this.pathObj.draw("M", a);
                    app.canvas.manageObjSelection("+", this.pathObj);
                }
            }
        }
    };

// Polygon Tool Definition Ends ***************************



// Line Tool Definition Starts ***************************

    app.toolSet.lineTool = {
        pathObj : false,

        doTheJob : function(type, a) {

            if(type === "mouseup") {

                if(this.pathObj) {
                    this.pathObj.draw("L", a);
                    this.pathObj = false;
                } else {
                    app.canvas.manageObjSelection(false);
                    //this function removes existing selected objects if there's any.

                    this.pathObj = new app.PathEditLine("create");
                    this.pathObj.draw("M", a);
                    app.canvas.manageObjSelection("+", this.pathObj);
                }
            }
        }
    };    
    
// Line Tool Definition Ends ***************************
    
    
    /* This function examines whether the clicked point is inside the
    'vertexClickTolerance' area of the first vertex of the path. 
    If Yes, it returns 'true' and if Not, it returns 'false' */
    app.toolSet.checkPathCompletion = function(startXY, endXY) {
        let x1 = startXY[0], y1 = startXY[1],
            x2 = endXY[0], y2 = endXY[1],
            tmp = app.toolSet.vertexClickTolerance;

        if((x1 >= x2 - tmp && x1 <= x2 + tmp) &&
           (y1 >= y2 - tmp && y1 <= y2 + tmp)) {
            return true;
        } else {
            return false;
        }
    };


})(window.app);