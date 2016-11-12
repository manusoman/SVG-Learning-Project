"use strict";


(function(app) {    
    

    app.toolSet.polygonTool = {
        pathObj : false,
        initialCoord : [],

        doTheJob : function(type, coord) {            
            
            if(type === "mousedown") {
                
                if(this.pathObj) {
                        
                    if(app.toolSet.checkPathCompletion(this.initialCoord, coord)) {
                        this.pathObj.draw("Z", coord);
                        this.pathObj = false;
                    } else {
                        this.pathObj.draw("L", coord);
                    }
                    
                } else {
                    
                    this.initialCoord = coord;
                    this.pathObj = app.canvas.manageObjGeneration("create");
                    this.pathObj.draw("M", coord);                    
                }                
            }            
        }
    };


})(window.app);