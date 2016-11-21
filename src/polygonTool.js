"use strict";


(function(app) {
    
    
    app.toolSet.polygonTool = {
        pathObj : false,
        vertex  : false,

        doTheJob : function(type, coord) {
            
            if(type === "mousedown") {
                
                if(!this.pathObj) {
                    this.pathObj = app.canvas.manageObjGeneration("create");
                }
                
                this.pathObj.draw("create", [false, coord, false]);
                this.vertex = coord;
                
            } else if(type === "mousemove") {
                
                if(this.vertex) {
                    this.pathObj.draw("manip", [false, coord, false]);
                    this.vertex = coord;
                }
                
            } else if(type === "mouseup") {
                this.vertex = false;
                
                if(this.pathObj.isClosedPath) {
                    this.pathObj = false;
                }
                
            } else {
                console.log("Custom Error: Couldn't recognize mouse event!");
            }
        }
    };


})(window.app);