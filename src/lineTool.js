"use strict";


(function(app) {
    
    
    app.toolSet.lineTool = {
        pathObj     : false,
        vertex      : false,
        vertexCount : 0,

        doTheJob : function(type, coord) {
            
            if(type === "mousedown") {
                
                if(!this.pathObj) {
                    this.pathObj = app.canvas.manageObjGeneration("create");
                }
                
                this.pathObj.draw("create", [false, coord, false]);
                this.vertex = coord;
                
            } else if(type === "mousemove") {
                
                if(this.vertex) { // checks whether "mousedown" event happened before "mousemove".
                    this.pathObj.draw("manip", [false, coord, false]);
                    this.vertex = coord;
                }
                
            } else if(type === "mouseup") {
                this.vertex = false;
                this.vertexCount++;
                
                if(this.vertexCount === 2) {
                    this.pathObj = false;
                    this.vertexCount = 0;
                }
                
            } else {
                console.log("Custom Error: Couldn't recognize mouse event!");
            }
        }
    };


})(window.app);