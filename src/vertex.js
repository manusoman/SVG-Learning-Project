"use strict";

(function(app) {
    
    app.Vertex = function() {
        this.points = [];
    }
    
    
    app.Vertex.prototype = {
        constructor : app.Vertex,
        
        set vData(vData) {
            this.points = vData;
        },
        
        get vData() {
            return this.points;
        },        
        
        insertTangent : function() {
            this.t1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        }
    };
    
})(window.app);