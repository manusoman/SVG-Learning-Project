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
    
    
    app.toolSet.serveToolData = function(target, type, shiftKey, ctrlKey, altKey, coord) {
        
        if(type === "mousedown") {
            app.canvas.element.addEventListener("mousemove", window.app.canvas.handleEvent, false);
        } 
        
        if(type === "mouseup") {
            app.canvas.element.removeEventListener("mousemove", window.app.canvas.handleEvent, false);
        }
        
        switch(app.appUI.toolSelected) {
            case "moveTool":
                app.toolSet.moveTool.doTheJob(target, type, shiftKey, ctrlKey, coord);
                break;
            case "polygonTool":
                app.toolSet.polygonTool.doTheJob(type, coord);
                break;
            case "penTool":
                app.toolSet.penTool.doTheJob(type, coord);
                break;
            case "lineTool":
                app.toolSet.lineTool.doTheJob(type, coord);
                break;
            default :
                alert("No tool was selected");
        }
    };



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

                    this.pathObj = new app.PathObject("create");
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
    /*app.toolSet.checkPathCompletion = function(startXY, endXY) {
        let x1 = startXY[0], y1 = startXY[1],
            x2 = endXY[0], y2 = endXY[1],
            tmp = app.toolSet.vertexClickTolerance;

        if((x1 >= x2 - tmp && x1 <= x2 + tmp) &&
           (y1 >= y2 - tmp && y1 <= y2 + tmp)) {
            return true;
        } else {
            return false;
        }
    };*/


})(window.app);