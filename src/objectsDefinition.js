/* Defines different type of objects, their prototypes and inheritance */

"use strict";

(function(app) {	

    // Path object constructor
    app.PathObject = function(func, ele) {
        this.bossElement = {};
        this.isClosedPath = false;
        this.pathNodeArray = false;
        
        this.element = {};
        this.pathData = "";
        this.startPoint = [];
        this.tMatrix = [];
        this.translationPivot = [];
        
        this.fillColor = "";
        this.fillOpacity = "";
        this.strokeColor = "";
        this.strokeOpacity = "";
        this.strokeWidth = "";
        
        this[func](ele);
        // This function eliminates the requirement of a conditional statement.
        // Only 'assign' function make use of the 'ele' value.
    };


    // Defining the prototype of every objects 
    // created by the PathObject constructor.
    app.PathObject.prototype = {
        
        constructor : app.PathObject,
        
        
        
        
        create : function() {
            this.element = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.element.id = "Layer" + (++app.appUI.layerPalette.layerIDCount);
            this.element.setAttribute("d", "");
            this.element.setAttribute("transform", "matrix(1,0,0,1,0,0)");
            
            this.copyColorNStroke("set", "fillColor");
            this.copyColorNStroke("set", "fillOpacity");
            this.copyColorNStroke("set", "strokeColor");
            this.copyColorNStroke("set", "strokeOpacity");
            this.copyColorNStroke("set", "strokeWidth");

            app.canvas.element.appendChild(this.element);
            
            this.createBossElement();
        },
        
        
        
        
        createBossElement : function() {
            this.bossElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.bossElement.setAttribute("class", "pathEditLine");
            this.passElementAttributes(this.element, this.bossElement, "d");
            this.passElementAttributes(this.element, this.bossElement, "transform");
            
            app.canvas.element.appendChild(this.bossElement);
            this.initiate_Translation_Data();
        },
        
        
        
        
        removeBossElement : function() {
            this.bossElement.parentElement.removeChild(this.bossElement);
        },
        
        
        
        
        assign : function(ele) {
            this.element = ele;            
            this.createBossElement();
            
            this.copyColorNStroke("get");
        },
        
        
        
        
        draw : function(type, vData) {
            let d, tmp, flag = false;
            
            if(type === "create") {
                
                if(!this.pathNodeArray) {                
                    this.pathNodeArray = [];
                    flag = true;

                } else {

                    if(this.checkPathCompletion(vData[1])) {
                        
                        this.isClosedPath = true;
                        
                    } else {
                        flag = true;
                    }

                }

                if(flag) {
                    tmp = new app.Vertex();
                    tmp.vData = vData;
                    this.pathNodeArray.push(tmp);
                }
                
            } else if(type === "manip") {
                
                if(this.isClosedPath) {
                    let l = this.pathNodeArray.length,
                        lastVtxVdata = this.pathNodeArray[l - 1].vData;
                    
                    if(vData[2] || lastVtxVdata[2]) {
                        this.pathNodeArray[0].vData[0] = vData[0];
                    }
                    
                } else {                
                    let l = this.pathNodeArray.length;
                    this.pathNodeArray[l - 1].vData = vData;
                }
                
            } else {
                console.log("Custom Error: Mouse event type is not understood!");
            }
            
            d = this.generatePathData();
            this.bossElement.setAttribute("d", d);
            this.passElementAttributes(this.bossElement, this.element, "d");
        },
        
        
        
        
        checkPathCompletion : function(EVdata) {            
            let tmp = app.toolSet.vertexClickTolerance,
                IVdata = this.pathNodeArray[0].vData[1],
                x1 = IVdata[0], y1 = IVdata[1],
                x2 = EVdata[0], y2 = EVdata[1];

            if((x1 >= x2 - tmp && x1 <= x2 + tmp) &&
               (y1 >= y2 - tmp && y1 <= y2 + tmp)) {
                
                return [IVdata];
                
            } else {
                return false;
            }
        },
        
        
        
        
        initiate_Translation_Data : function() {
            this.tMatrix = this.bossElement.getAttribute("transform").slice(7, -1).split(",");
            this.translationPivot = [parseFloat(this.tMatrix[4]), parseFloat(this.tMatrix[5])];
        },
        
        
        
        
        translate : function(x, y) {
            let str = "";

            x = this.translationPivot[0] + x;
            y = this.translationPivot[1] + y;

            str = "matrix(" +
                this.tMatrix[0] + "," +
                this.tMatrix[1] + "," +
                this.tMatrix[2] + "," +
                this.tMatrix[3] + "," + x + "," + y + ")";

            this.bossElement.setAttribute("transform", str);
        },
        
        
        
        
        copyColorNStroke : function(opt, attr) {
            
            if(opt === "set") {
                switch(attr) {
                    case "fillColor":
                        this.element.setAttribute("fill", app.appUI.fillColor);
                        this.element.setAttribute("fill-opacity", app.appUI.fillOpacity);
                        this.fillColor = app.appUI.fillColor;
                        this.fillOpacity = app.appUI.fillOpacity;
                        break;
                    case "strokeColor":
                        this.element.setAttribute("stroke", app.appUI.strokeColor);
                        this.element.setAttribute("stroke-opacity", app.appUI.strokeOpacity);
                        this.strokeColor = app.appUI.strokeColor;
                        this.strokeOpacity = app.appUI.strokeOpacity;
                        break;
                    case "strokeWidth":
                        this.element.setAttribute("stroke-opacity", app.appUI.strokeOpacity);
                        this.element.setAttribute("stroke-width", app.appUI.strokeWidth);
                        this.strokeWidth = app.appUI.strokeWidth;
                        this.strokeOpacity = app.appUI.strokeOpacity;
                        break;
                }
                
            } else if(opt === "get") {
                this.fillColor = this.element.getAttribute("fill");
                this.fillOpacity = this.element.getAttribute("fill-opacity");
                this.strokeColor = this.element.getAttribute("stroke");
                this.strokeOpacity = this.element.getAttribute("stroke-opacity");
                this.strokeWidth = this.element.getAttribute("stroke-width");
                
            } else {
                console.log("Custom-error : Choose an option!");
            }
        },
        
        
        
        
        passElementAttributes : function(source, destn, attr) {
            let tmp = source.getAttribute(attr);
            destn.setAttribute(attr, tmp);
        }
    };

})(window.app);