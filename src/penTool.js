"use strict";


(function(app) {    
    

    app.toolSet.penTool = {
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
                
                if(this.vertex) { // checks whether "mousedown" event happened before "mousemove".
                    let lcp = [];

                    lcp[0] = this.vertex[0] + (this.vertex[0] - coord[0]);
                    lcp[1] = this.vertex[1] + (this.vertex[1] - coord[1]);

                    this.pathObj.draw("manip", [lcp, this.vertex, coord] );
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