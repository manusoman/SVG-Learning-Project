"use strict";

app.canvas = {
	element 		: document.getElementById("Canvas"),
	
	width 			: 800,
	height 			: 600,
	BGC 			: "#FFF",
	
	selectedObjects : false,
	objectList 		: []	// an array of IDs for every object in the canvas.
};



(function(app) {
	
	app.canvas.element.setAttribute("width", app.canvas.width);
	app.canvas.element.setAttribute("height", app.canvas.height);
	app.canvas.element.style.backgroundColor = app.canvas.BGC;
	
	
	// Canvas event handlers start ***********************************************
	
	
	app.canvas.element.addEventListener("click", function(event) {
		app.canvas.handleEvent(event);
	}, false);
	
	app.canvas.element.addEventListener("dragstart", function(event) {
		app.canvas.handleEvent(event);
	}, false);
	
	app.canvas.element.addEventListener("drag", function(event) {
		app.canvas.handleEvent(event);
	}, false);
	
	app.canvas.element.addEventListener("dragend", function(event) {
		app.canvas.handleEvent(event);
	}, false);
	
	
	// Canvas event handlers end ***********************************************
	
	
	app.canvas.handleEvent = function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		let a = this.element.getBoundingClientRect(),
			x = e.clientX - a.left,
			y = e.clientY - a.top;
		
		switch(app.appUI.toolSelected) {
			case "moveTool":
				app.toolSet.moveTool.doTheJob(e.target, e.type, e.shiftKey, e.ctrlKey, [x, y]);
				break;
			case "polygonTool":
				app.toolSet.polygonTool.doTheJob(x, y);
				break;
			case "lineTool":
				app.toolSet.lineTool.doTheJob(x, y);
				break;
			default :
				alert("No tool was selected");
		}		
	}
	
	app.canvas.manageObjSelection = function(a, b) {
		
		if(a === "+") { // Single object selection.
			app.canvas.manageObjSelection(false);
			// Clears all the existing objects before a new selection is added.
			
			app.canvas.selectedObjects = [b];
			
		} else if(a === "++") { // Add object to existing selection.
			
			if(!app.canvas.selectedObjects) {
				app.canvas.selectedObjects = [];
			}
			app.canvas.selectedObjects.push(b);
			
		} else if(a === "--") { // Minus object from existing selection.
			
			if(app.canvas.selectedObjects) {
				let i = app.canvas.selectedObjects.indexOf(b),
					t = app.canvas.selectedObjects.splice(i, 1);
				t = null;
				
				if(app.canvas.selectedObjects.length === 0) {
					app.canvas.manageObjSelection(false);
				}
			}
			
		} else { // If no selection.
			
			if(app.canvas.selectedObjects) {
				let i, l = app.canvas.selectedObjects.length;
				for(i = 0; i < l; i++) {
					app.canvas.selectedObjects[i] = null;
				}
			}
			app.canvas.selectedObjects = false;
		}
		
		
		app.appUI.layerPalette.selectionUpdate();
		
		return app.canvas.selectedObjects;
		
	};
	
})(window.app);