/* Defines different type of objects, their prototypes and inheritance */

"use strict";

(function(app) {	
	
	// Path object constructor
	app.PathObject = function(type, a) {
        // 'type' is the type of action. Possible values are
        // 'create' & 'assign'.
        // 'a' varies according to who calles the constructor.
        
		this.element = {};
		this.startPoint = [];
        this.tMatrix = [];
        this.translationPivot = [];
        this.initialCoord = [];
		
		this[type](a);
        // This function eliminates the requirement of a conditional statement.
        // Only 'assign' function make use of the 'a' value.
	}
	
	
	// Defining the prototype of every objects 
	// created by the PathObject constructor.
	app.PathObject.prototype = {
		constructor : app.PathObject,
		
		// 'create' function creates an SVG path.
		create : function(a) { // Here, var 'a' is actually an array of coordinates.
			
			this.element = document.createElementNS("http://www.w3.org/2000/svg", "path");
			this.element.id = "Layer" + (++app.appUI.layerPalette.layerIDCount);
			this.element.setAttribute("transform", "matrix(1,0,0,1,0,0)");
			this.element.setAttribute("fill", app.appUI.fillColor);
			this.element.setAttribute("fill-opacity", app.appUI.fillOpacity);
			this.element.setAttribute("stroke", app.appUI.strokeColor);
			this.element.setAttribute("stroke-opacity", app.appUI.strokeOpacity);
			this.element.setAttribute("stroke-width", app.appUI.strokeWidth);
			
			this.element.setAttribute("d", ("M" + a[0] + " " + a[1]));
			// Initializes the first vertex of the path.
			
			app.canvas.element.appendChild(this.element);
			
			this.startPoint = a;
            this.initiate_Translation_Data();
		},
		
		
		/*'assign' function takes the currently selected path object
		and wraps it inside a PathObject.*/
		assign : function(a) { // Here, var 'a' is the currently selected path element.
			this.element = a;
            this.initiate_Translation_Data();
		},
		
		
		draw : function(a) {
			let x = a[0], y = a[1],
                d = this.element.getAttribute("d");
				
			/* This 'if-else' block of the polygon tool examines whether
			the clicked point is inside the 'vertexClickTolerance' area of
			the first vertex of the polygon. 
			If Yes, then it closes the polygon and if Not, it continues adding
			more and more vertex to the polygon. */
			if((this.startPoint[0] >= (x - app.toolSet.vertexClickTolerance) &&
			  this.startPoint[0] <= (x + app.toolSet.vertexClickTolerance)) &&
			  (this.startPoint[1] >= (y - app.toolSet.vertexClickTolerance) &&
			  this.startPoint[1] <= (y + app.toolSet.vertexClickTolerance))) {

				this.element.setAttribute("d", (d + " Z"));
				return false;
			} else {
				d += " L" + x + " " + y;
				this.element.setAttribute("d", d);
				return this;
			}
		},
        
		// This function stores the current 'translate-matrix' data to a variable
		// whenever a PathObject is created or a translation is finished.
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
		}
	};
	
})(window.app);