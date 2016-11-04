/* Defines different type of objects, their prototypes and inheritance */

"use strict";

(function(app) {	

    // Path object constructor
    app.PathObject = function(func, ele) {
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
        
        // 'create' function creates an SVG path.
        create : function() {

            this.element = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.element.id = "Layer" + (++app.appUI.layerPalette.layerIDCount);
            this.element.setAttribute("transform", "matrix(1,0,0,1,0,0)");
            
            this.applyColorNStroke("fillColor");
            this.applyColorNStroke("fillOpacity");
            this.applyColorNStroke("strokeColor");
            this.applyColorNStroke("strokeOpacity");
            this.applyColorNStroke("strokeWidth");

            app.canvas.element.appendChild(this.element);
            
            this.initiate_Translation_Data();
        },
        
        /*'assign' function takes the currently selected path object
        and wraps it inside a PathObject.*/
        assign : function(ele) { // Here, 'ele' is the currently selected path element.
            this.element = ele;
            this.fillColor = ele.getAttribute("fill");
            this.fillOpacity = ele.getAttribute("fill-opacity");
            this.strokeColor = ele.getAttribute("stroke");
            this.strokeOpacity = ele.getAttribute("stroke-opacity");
            this.strokeWidth = ele.getAttribute("stroke-width");
            
            this.initiate_Translation_Data();
        },
        
        
        // This function modifies the current path object's 'd' attribute
        // as per the instruction given by the 'tool' object.
        draw : function(action, coord) {
            
            if(coord.length > 0) {
            
                switch(action) {
                    case "M":
                        this.pathData += "M" + coord[0] + "," + coord[1];
                        break;
                        
                    case "L":
                        this.pathData += " L" + coord[0] + "," + coord[1];
                        break;
                        
                    case "C":
                        this.pathData += " C" + coord[0] + "," + coord[1] + "," +
                                                coord[2] + "," + coord[3] + "," +
                                                coord[4] + "," + coord[5];
                        break;
                        
                    case "Z":
                        this.pathData += " Z";
                        break;
                        
                    default:
                        console.log("Action is not specified");
                }
                
                this.element.setAttribute("d", this.pathData);
                
            } else {
                console.log("Error while drawing : Co-ordinate list is empty");
            }
        },
        
        
        // This function stores the current 'translate-matrix' data to a variable.
        initiate_Translation_Data : function() {
            this.tMatrix = this.element.getAttribute("transform").slice(7,-1).split(",");
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

            this.element.setAttribute("transform", str);
        },        
        
        
        applyColorNStroke : function(x) {
            
            switch(x) {
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
        }
    };

})(window.app);