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
		doTheJob : function(target, type, a) {
			if(target === app.canvas.element) {
				app.canvas.selectedLayer = false;
				
			} //else if() {}
		}
	};
	
// Move Tool Definition Ends ***************************
	
// Polygon Tool Definition Starts ***************************
	
	app.toolSet.polygonTool = {
		pathObj : false,
		
		doTheJob : function(x, y) {
			
			if(this.pathObj) {				
				this.pathObj = this.pathObj.draw(x, y);				
			} else {				
				this.pathObj = new app.PathObject("create", [x, y]);
			}			
		}
	};
	
// Polygon Tool Definition Ends ***************************
	
// Line Tool Definition Starts ***************************
	
	app.toolSet.lineTool = {
		pathObj : false,
		
		doTheJob : function(x, y) {
			
			if(this.pathObj) {
				this.pathObj.draw(x, y);
				this.pathObj = false;
			} else {
				this.pathObj = new app.PathObject("create", [x, y]);
			}
		}
	};
	
// Line Tool Definition Ends ***************************
	
})(window.app);