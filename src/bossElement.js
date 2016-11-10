"use strict";

(function(app) {
    
    app.PathObject.prototype.generatePoints = function(d) {        
        let i, j, l, x = false, typ, tmp, nodeArray = [];
        
        d = d.split(" ");
        l = d.length;
        
        for(i = 0; i < l; i++) {
            typ = d[i].charAt(0);
            
            if(typ !== "Z") {
                tmp = d[i].substring(1).split(",");
            
                for(j = 0; j < tmp.length; j++) {
                    tmp[j] = parseFloat(tmp[j]);
                }
            }
            
            switch(typ) {
                    
                case "M":
                    nodeArray[i]      = [false, tmp, false];
                    break;
                    
                case "L":
                    nodeArray[i]      = [false, tmp, false];
                    break;
                    
                case "C":
                    nodeArray[i-1][2] = [tmp[0], tmp[1]]
                    nodeArray[i]      = [[tmp[2], tmp[3]], [tmp[4], tmp[5]], false];
                    
                    x = (tmp[4] === nodeArray[0][1][0]) && (tmp[5] === nodeArray[0][1][1]);
                    break;
                    
                case "Z":
                    
                    if(x) {
                        nodeArray[0][0] = nodeArray[nodeArray.length - 1][0];
                    }
                    nodeArray.pop();
                    this.isClosedPath = true;
                    break;
            }
        }
        
        this.pathNodeArray = [];
        l = nodeArray.length;
        for(i = 0; i < l; i++) {
            this.pathNodeArray[i] = new window.app.Vertex();
            this.pathNodeArray[i].vData = nodeArray[i];
        }
        
    };
    
})(window.app);