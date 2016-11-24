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
        
        let i, j, tmp0, tmp1, initCtrlPoint,
            l = this.pathNodeArray.length, d = "M";
        
        for(i = 0; i < l; i++) {
            
            tmp1 = this.pathNodeArray[i].vData;
            j = i - 1;
            
            if(j < 0) {
                
                initCtrlPoint = tmp1[0];
                d += tmp1[1][0] + "," + tmp1[1][1];
                
            } else {
                
                tmp0 = this.pathNodeArray[j].vData;
                
                if(!tmp0[2] && !tmp1[0]) {
                    d += " L" + tmp1[1][0] + "," + tmp1[1][1];
                } else {
                    
                    tmp0[2] = tmp0[2] ? tmp0[2] : tmp0[1];
                    tmp1[0] = tmp1[0] ? tmp1[0] : tmp1[1];
                    
                    d += " C" + tmp0[2][0] + "," + tmp0[2][1] + "," +
                                tmp1[0][0] + "," + tmp1[0][1] + "," +
                                tmp1[1][0] + "," + tmp1[1][1];
                }
            }
        }
        
        if(this.isClosedPath) {
            
            tmp0 = this.pathNodeArray[l - 1].vData;
            tmp1 = this.pathNodeArray[0].vData;
            
            if(tmp0[2] || tmp1[0]) {
                
                tmp0[2] = tmp0[2] ? tmp0[2] : tmp0[1];
                tmp1[0] = tmp1[0] ? tmp1[0] : tmp1[1];

                d += " C" + tmp0[2][0] + "," + tmp0[2][1] + "," +
                            tmp1[0][0] + "," + tmp1[0][1] + "," +
                            tmp1[1][0] + "," + tmp1[1][1];
            }
            
            d += " Z";
        }
        
        return d;
    };
    
    
    
    
    
})(window.app);