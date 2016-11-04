/* Defines different type of objects, their prototypes and inheritance */

"use strict";

(function(app) {	

    // Path object constructor
    app.PathObject = function(func, ele) {
        this.element = {};
        
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
            
            this.applyColorNStroke("fillColor");
            this.applyColorNStroke("fillOpacity");
            this.applyColorNStroke("strokeColor");
            this.applyColorNStroke("strokeOpacity");
            this.applyColorNStroke("strokeWidth");

            app.canvas.element.appendChild(this.element);
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
        },
        
        
        editObject : function(attribute, value) {
            this.element.setAttribute(attribute, value);
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