"use strict";


(function(app) {    
    

    app.toolSet.polygonTool = {
        pathObj : false,

        doTheJob : function(type, coord) {
            
            if(type === "mousedown") {
                
                if(this.pathObj) {
                    
                    let flag = this.pathObj.draw( [false, coord, false] );
                    
                    if(flag) {
                        this.pathObj = false;
                    }
                    
                } else {
                    
                    this.pathObj = app.canvas.manageObjGeneration("create");
                    this.pathObj.draw( [false, coord, false] );             
                }                
            }            
        }
    };


})(window.app);