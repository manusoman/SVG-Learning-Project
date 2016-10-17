/* Define the action of each tool in the toolbox */

"use strict";

var toolSet = {
	moveTool 				: {},
	polygonTool 			: {},
	lineTool 				: {},
	vertexClickTolerance	: 5
};



(function() {
	
// Move Tool Definition Starts ***************************
	
	window.toolSet.moveTool = {
		ele : false
	};
	
// Move Tool Definition Ends ***************************
	
// Polygon Tool Definition Starts ***************************
	
	window.toolSet.polygonTool = {
		ele : false,
		startPoint : [],
		
		draw : function(x, y) {
			
			if(this.ele) {
				
				let d = this.ele.getAttribute("d");
				
				/* This 'if-else' block of the polygon tool examines whether
				the clicked point is inside the 'vertexClickTolerance' area of
				the first vertex of the polygon. 
				If Yes, then it closes the polygon and if Not, it continues adding
				more and more vertex to the polygon. */
				if((this.startPoint[0] >= (x - window.toolSet.vertexClickTolerance) &&
				  this.startPoint[0] <= (x + window.toolSet.vertexClickTolerance)) &&
				  (this.startPoint[1] >= (y - window.toolSet.vertexClickTolerance) &&
				  this.startPoint[1] <= (y + window.toolSet.vertexClickTolerance))) {
					
					this.ele.setAttribute("d", (d + " Z"));
					this.ele = false;
				} else {				   
					d += " L" + x.toString() + " " + y.toString();
					this.ele.setAttribute("d", d);
				}
				
			} else {
				this.startPoint = [x, y];
				this.ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
				this.ele.setAttribute("d", ("M" + x.toString() + " " + y.toString()));
				this.ele.setAttribute("fill", window.appUI.fillColor);
				this.ele.setAttribute("stroke", window.appUI.strokeColor);
				this.ele.setAttribute("stroke-width", window.appUI.strokeWidth);
				window.canvas.element.appendChild(this.ele);
			}
		}
	};
	
// Polygon Tool Definition Ends ***************************
	
// Line Tool Definition Starts ***************************
	
	window.toolSet.lineTool = {
		ele : false,
		draw : function(x, y) {
			
			if(this.ele) {
				let d = this.ele.getAttribute("d") + " L" + x.toString() + " " + y.toString();	
				this.ele.setAttribute("d", d);
				this.ele = false;
			} else {
				this.ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
				this.ele.setAttribute("d", ("M" + x.toString() + " " + y.toString()));
				this.ele.setAttribute("fill", window.appUI.fillColor);
				this.ele.setAttribute("stroke", window.appUI.strokeColor);
				this.ele.setAttribute("stroke-width", window.appUI.strokeWidth);
				window.canvas.element.appendChild(this.ele);
			}
		}
	};
	
// Line Tool Definition Ends ***************************
	
})();