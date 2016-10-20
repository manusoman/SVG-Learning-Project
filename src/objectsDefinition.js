/* Defines different type of objects, their prototypes and inheritance */

"use strict";

(function(app) {	
	
	// Path object constructor
	app.PathObject = function(x, y) {
		this.element = {};
		this.startPoint = [];
		
		this[x](y); // this function eliminates the requirement of a conditional statement.
	}
	
	app.PathObject.prototype = {
		constructor : app.PathObject,
		
		// 'create' function creates an SVG path.
		create : function(a) { // Here, var 'a' is actually an array of coordinates.
			
			this.element = document.createElementNS("http://www.w3.org/2000/svg", "path");
			this.element.id = "Layer" + (++app.appUI.layerPalette.layerIDCount);
			this.element.setAttribute("draggable", true);
			this.element.setAttribute("fill", app.appUI.fillColor);
			this.element.setAttribute("fill-opacity", app.appUI.fillOpacity);
			this.element.setAttribute("stroke", app.appUI.strokeColor);
			this.element.setAttribute("stroke-opacity", app.appUI.strokeOpacity);
			this.element.setAttribute("stroke-width", app.appUI.strokeWidth);
			
			this.element.setAttribute("d", ("M" + a[0] + " " + a[1]));
			// Initializes the first vertex of the path.
			
			app.canvas.element.appendChild(this.element);
			
			this.startPoint = a;
		},
		
		
		/*'assign' function takes the currently selected path object
		and wraps it inside a PathObject.*/
		assign : function(a) { // Here, var 'a' is the currently selected path element.
			this.element = a;
		},
		
		
		draw : function(x, y) {
			let d = this.element.getAttribute("d");
				
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
		}
	};
	
})(window.app);