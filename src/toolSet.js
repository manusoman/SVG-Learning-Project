/* Define the action of each tool in the toolbox */

"use strict";

app.toolSet = {
	moveTool 				: {},
	polygonTool 			: {},
	lineTool 				: {},
	vertexClickTolerance	: 5
};



(function(app) {
	
// Move Tool Definition Starts ***************************
	
	app.toolSet.moveTool = {
		ele : false,
		doTheJob : function(target, type) {
			if(target === app.canvas.element) {
				app.canvas.selectedLayer = false;
			} //else if() {}
		}
	};
	
// Move Tool Definition Ends ***************************
	
// Polygon Tool Definition Starts ***************************
	
	app.toolSet.polygonTool = {
		pathObj : false,
		startPoint : [],
		
		doTheJob : function(x, y) {
			
			if(this.pathObj) {
				
				this.pathObj.drawPathObject(x, y);
				
			} else {
				
				let tmp = new PathObject();
				tmp.createPathObject();
				this.pathObj = tmp.drawPathObject(x, y);				
			}
			
			// -----------------------------------------------------------
			if(this.ele) {
				
				let d = this.ele.getAttribute("d");
				
				/* This 'if-else' block of the polygon tool examines whether
				the clicked point is inside the 'vertexClickTolerance' area of
				the first vertex of the polygon. 
				If Yes, then it closes the polygon and if Not, it continues adding
				more and more vertex to the polygon. */
				if((this.startPoint[0] >= (x - app.toolSet.vertexClickTolerance) &&
				  this.startPoint[0] <= (x + app.toolSet.vertexClickTolerance)) &&
				  (this.startPoint[1] >= (y - app.toolSet.vertexClickTolerance) &&
				  this.startPoint[1] <= (y + app.toolSet.vertexClickTolerance))) {
					
					this.ele.setAttribute("d", (d + " Z"));
					this.ele = false;
				} else {
					d += " L" + x + " " + y;
					this.ele.setAttribute("d", d);
				}
				
			} else {
				this.startPoint = [x, y];
				this.ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
				this.ele.setAttribute("draggable", true);
				this.ele.setAttribute("d", ("M" + x + " " + y));
				this.ele.setAttribute("fill", app.appUI.fillColor);
				this.ele.setAttribute("fill-opacity", app.appUI.fillOpacity);
				this.ele.setAttribute("stroke", app.appUI.strokeColor);
				this.ele.setAttribute("stroke-opacity", app.appUI.strokeOpacity);
				this.ele.setAttribute("stroke-width", app.appUI.strokeWidth);
				app.canvas.element.appendChild(this.ele);
				app.canvas.selectedLayer = this.ele;
			}
		}
	};
	
// Polygon Tool Definition Ends ***************************
	
// Line Tool Definition Starts ***************************
	
	app.toolSet.lineTool = {
		ele : false,
		doTheJob : function(x, y) {
			
			if(this.ele) {
				let d = this.ele.getAttribute("d") + " L" + x.toString() + " " + y.toString();	
				this.ele.setAttribute("d", d);
				this.ele = false;
			} else {
				this.ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
				this.ele.setAttribute("draggable", true);
				this.ele.setAttribute("d", ("M" + x.toString() + " " + y.toString()));
				this.ele.setAttribute("fill", app.appUI.fillColor);
				this.ele.setAttribute("stroke", app.appUI.strokeColor);
				this.ele.setAttribute("stroke-width", app.appUI.strokeWidth);
				app.canvas.element.appendChild(this.ele);
				app.canvas.selectedLayer = this.ele;
			}
		}
	};
	
// Line Tool Definition Ends ***************************
	
})(window.app);