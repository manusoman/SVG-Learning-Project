"use strict";

app.canvas = {
	element 		: document.getElementById("Canvas"),
	selectedLayer	: false,
	objectList 		: []	// an array of IDs for every object in the canvas.
};

(function(app) {
	
	app.canvas.element.setAttribute("width", app.canvasConfig.canvasWidth);
	app.canvas.element.setAttribute("height", app.canvasConfig.canvasHeight);
	app.canvas.element.style.backgroundColor = app.canvasConfig.canvasBGC;
	
	app.canvas.element.addEventListener("click", function(event) {
		app.canvas.handleEvent(event);
	}, false);
	
	app.canvas.handleEvent = function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		let a = this.element.getBoundingClientRect();
		let x = e.clientX - a.left;
		let y = e.clientY - a.top;
		
		if(app.appUI.toolSelected === "moveTool") {
			app.toolSet.moveTool.doTheJob(x, y);
		} else if(app.appUI.toolSelected === "polygonTool") {
			app.toolSet.polygonTool.doTheJob(x, y);
		} else if(app.appUI.toolSelected === "lineTool") {
			app.toolSet.lineTool.doTheJob(x, y);
		}
		
	}
	
})(window.app);