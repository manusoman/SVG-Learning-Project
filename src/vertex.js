"use strict";

(function(app) {
    
    app.Vertex = function() {
        this.type = "";
        this.point = [];
    }
    
    
    app.Vertex.prototype = {
        constructor : app.Vertex,
        
        set vData(vData) {
            this.type = vData.charAt(0);
            
            let tmp = vData.substring(1).split(",");
        },
        
        get vData() {
            let i, l = this.point.length, vData = this.type;
            for(i = 0; i < l; i++) {
                vData += this.point[i][0] + "," +
                         this.point[i][1] + ",";
            }
            return vData.slice(0, -1);
            // Slices off the last "," and then returns the data.
        }
    };
    
})(window.app);