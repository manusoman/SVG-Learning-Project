/* Define the action of each tool in the toolbox.

Each time a path element is selected, a wraper object for 
that element is created using the 'PathObject' constructor.
And as soon as the selection is removed, the object is destroyed. */

"use strict";

app.toolSet = {
	moveTool               : {},
	polygonTool            : {},
	lineTool               : {},
	vertexClickTolerance   : 5
};



(function(app) {
	
// Move Tool Definition Starts ***************************
	
	
	app.toolSet.moveTool = {
		
		/* Each time a path element is selected, a wraper object for 
		that element is created using the 'PathObject' constructor.
		And as soon as the selection is removed, the object is destroyed. */
		
		/* MoveTool attaches a 'mousemove' event to the canvas element between
		a 'mousedown' and 'mouseup' event on it. This prevents the objects from
		getting dragged by other tools as the 'mousemove' event exists only when
		moveTool is active. */
        
		initialCoord : [],
		
		doTheJob : function(target, type, shiftKey, ctrlKey, coord) {
			this[type](target, shiftKey, ctrlKey, coord);
		},
		
		mousedown : function(target, s, c, a) {
			// !important : 'a' is a coordinate array.
            
            this.initialCoord = a;
            app.canvas.element.addEventListener("mousemove", window.app.canvas.handleEvent, false);
			
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
					
				} else { // Makes a new selection.
                    
                    let i, l, f = false;
					
					// This if block checkes whether the target was already selected by
					// comparing the target with the object in the 'selectedObjs' list.
					// If yes, the function does nothing.
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
						app.canvas.manageObjSelection("+", new app.PathObject("assign", target));
					}
				}
			}
		},
        
        mousemove : function(target, s, c, a) {
            let i, l = app.canvas.selectedObjects.length,
                x = a[0] - this.initialCoord[0],
                y = a[1] - this.initialCoord[1];
            
			for(i = 0; i < l; i++) {
				app.canvas.selectedObjects[i].translate(x, y);
			}
        },
        
        mouseup : function() {
			let i, l = app.canvas.selectedObjects.length;			
			for(i = 0; i < l; i++) {
				app.canvas.selectedObjects[i].initiate_Translation_Data();
			}
			
			app.canvas.element.removeEventListener("mousemove", window.app.canvas.handleEvent, false);
        }
	};
	
// Move Tool Definition Ends ***************************
	
	
	
// Polygon Tool Definition Starts ***************************
	
	app.toolSet.polygonTool = {
		pathObj : false,
		
		doTheJob : function(type, a) {
            
            if(type === "mouseup") {
			
                if(this.pathObj) {
                    this.pathObj = this.pathObj.draw(a);				
                } else {
                    app.canvas.manageObjSelection(false);
                    //this function removes existing selected objects if there's any.

                    this.pathObj = new app.PathObject("create", a);
                    app.canvas.manageObjSelection("+", this.pathObj);
                }
            }
		}
	};
	
// Polygon Tool Definition Ends ***************************
	
	
	
// Line Tool Definition Starts ***************************
	
	app.toolSet.lineTool = {
		pathObj : false,
		
		doTheJob : function(type, a) {
            
            if(type === "mouseup") {
			
                if(this.pathObj) {
                    this.pathObj.draw(a);
                    this.pathObj = false;
                } else {
                    app.canvas.manageObjSelection(false);
                    //this function removes existing selected objects if there's any.

                    this.pathObj = new app.PathObject("create", a);
                    app.canvas.manageObjSelection("+", this.pathObj);
                }
            }
		}
	};
	
// Line Tool Definition Ends ***************************
	
})(window.app);