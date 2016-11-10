// test d datas :
// M0,50 C0,0,0,0,50,0 C100,0,100,0,100,50 C100,100,100,100,50,100 C0,100,0,100,0,50 Z
// M270.5,206 L339.5,153 L536.5,245 L329.5,353 Z

"use strict";

(function(app) {
    
    app.PathObject.prototype.generatePoints = function(d) {
        let i, j, l, typ, tmp, x = false, nodeArray = [];
        
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
                        nodeArray.pop();
                    }
                    this.isClosedPath = true;
                    break;
            }
        }
        
        this.pathNodeArray = [];
        console.log(nodeArray);
        l = nodeArray.length;
        for(i = 0; i < l; i++) {
            this.pathNodeArray[i] = new window.app.Vertex();
            this.pathNodeArray[i].vData = nodeArray[i];
        }
    };
    
    
    app.PathObject.prototype.generatePathData = function() {
        let i, l = this.pathNodeArray.length, tmp, initCtrlPoint, d = "M";
        for(i = 0; i < l; i++) {
            tmp = this.pathNodeArray[i].vData;
            
            d += tmp[1][0] + "," + tmp[1][1];
            
            // this section needs to be developed.
            
        }
        return d;
    };
    
})(window.app);