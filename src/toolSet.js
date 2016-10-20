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
	
	/* Each time a path element is selected, a wraper object for 
	that element is created using the 'PathObject' constructor.
	And as soon as the selection is removed, the object is destroyed. */
	
	app.toolSet.moveTool = {
		selectedObjs : false,
		
		doTheJob : function(target, type, s, c, a) {
			
			if(target === app.canvas.element) {
				app.canvas.manageObjSelection(false);
			} else {
				
				if(s) { // Checks whether Shift-key was pressed while event.
					let i, l, f = false;
					
					// This if block checkes whether the target was already selected by
					// comparing the target with the object in the 'selectedObjs' list.
					// If yes, it blocks the function from creating another duplicate
					// object for the same element.
					if(this.selectedObjs) {
						l = this.selectedObjs.length;
						for(i = 0; i < l; i++) {
							if(this.selectedObjs[i].element === target) {
								f = true;
								break;
							}
						}
					}
					
					if(!f) {
						this.selectedObjs = app.canvas.manageObjSelection("++", new app.PathObject("assign", target));
					}
										
				} else if(c) { // Checks whether Ctrl-key was pressed while event.
					let i, tmp = this.selectedObjs.length;
					for(i = 0; i < tmp; i++) {
						if(target === this.selectedObjs[i].element) {
							this.selectedObjs = app.canvas.manageObjSelection("--", this.selectedObjs[i]);
							break;
						}
					}
					
				} else {
					this.selectedObjs = app.canvas.manageObjSelection("+", new app.PathObject("assign", target));
				}
			}
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
				app.canvas.manageObjSelection(false);
				//this function removes existing selected objects if there's any.
				
				this.pathObj = new app.PathObject("create", [x, y]);
				app.canvas.manageObjSelection("+", this.pathObj);
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
				app.canvas.manageObjSelection(false);
				//this function removes existing selected objects if there's any.
				
				this.pathObj = new app.PathObject("create", [x, y]);
				app.canvas.manageObjSelection("+", this.pathObj);
			}
		}
	};
	
// Line Tool Definition Ends ***************************
	
})(window.app);