"use strict";


(function(app) {    
    

    app.toolSet.polygonTool = {
        pathObj : false,
        initialCoord : [],

        doTheJob : function(type, coord) {            
            
            if(type === "mousedown") {
                
                if(this.pathObj) {
                        
                    if(app.toolSet.checkPathCompletion(this.initialCoord, coord)) {
                        this.pathObj.isClosedPath = true;
                        this.pathObj = false;
                    } else {
                        this.pathObj.draw( [false, coord, false] );
                        //this.pathObj.draw("L", coord);
                    }
                    
                } else {
                    
                    this.initialCoord = coord;
                    this.pathObj = app.canvas.manageObjGeneration("create");
                    this.pathObj.draw( [false, coord, false] );
                    //this.pathObj.draw("M", coord);                    
                }                
            }            
        }
    };


})(window.app);