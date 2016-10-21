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
		
		mouseDragOffset : [],
		
		doTheJob : function(target, type, s, c, a) {
			this[type](target, s, c, a);
		},
		
		click : function(target, s, c, a) {
			
			if(target === app.canvas.element) {
				app.canvas.manageObjSelection(false);
			} else {
				
				if(s) { // Checks whether Shift-key was pressed while event.
					let i, l, f = false;
					
					// This if block checkes whether the target was already selected by
					// comparing the target with the object in the 'selectedObjs' list.
					// If yes, it blocks the function from creating another duplicate
					// object for the same element.
					if(app.canvas.selectedObjects) {
						l = app.canvas.selectedObjects.length;
						for(i = 0; i < l; i++) {
							if(app.canvas.selectedObjects[i].element === target) {
								f = true;
								break;
							}
						}
					}
					
					if(!f) {
						app.canvas.manageObjSelection("++", new app.PathObject("assign", target));
					}
										
				} else if(c) { // Checks whether Ctrl-key was pressed while event.
					let i, tmp = app.canvas.selectedObjects.length;
					for(i = 0; i < tmp; i++) {
						if(target === app.canvas.selectedObjects[i].element) {
							app.canvas.manageObjSelection("--", app.canvas.selectedObjects[i]);
							break;
						}
					}
					
				} else {
					app.canvas.manageObjSelection("+", new app.PathObject("assign", target));
				}
			}
		},
		
		dragstart : function(target, s, c, a) {
			
			this.mouseDragOffset = a;
			
			if(target === app.canvas.element) { // Checks whether the drag-start was on canvas.
				app.canvas.manageObjSelection(false);
				
			} else {
				
				if(app.canvas.selectedObjects) {
					let i, l = app.canvas.selectedObjects.length, f = false;
					for(i = 0; i < l; i++) {
						if(app.canvas.selectedObjects[i].element === target) {
							f = true;
							break;
						}
					}
					
					// If the darg-start was not on a selected object,
					// the new target is selected.
					if(!f) {
						let tmp = app.canvas.manageObjSelection("+", new app.PathObject("assign", target));
					}
					
				} else { // There was no selection, so the translation is applied 
					     // to the newly selected object.
					
					let tmp = app.canvas.manageObjSelection("+", new app.PathObject("assign", target));
				}
				
			}
		},
		
		drag : function(target, s, c, a) {
			let i, l = app.canvas.selectedObjects.length;
			for(i = 0; i < l; i++) {
				app.canvas.selectedObjects[i].translate(a[0], a[1]);
				console.log(app.canvas.selectedObjects[i]);
			}
			this.mouseDragOffset = a;
		},
		
		dragend : function(target, s, c, a) {
			console.log("drag ended");
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