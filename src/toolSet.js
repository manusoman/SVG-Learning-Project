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


})(window.app);