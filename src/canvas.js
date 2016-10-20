"use strict";

app.canvas = {
	element 		: document.getElementById("Canvas"),
	
	width : 800,
	height : 600,
	BGC : "#FFF",
	
	selectedLayer	: false,
	objectList 		: []	// an array of IDs for every object in the canvas.
};



(function(app) {
	
	app.canvas.element.setAttribute("width", app.canvas.width);
	app.canvas.element.setAttribute("height", app.canvas.height);
	app.canvas.element.style.backgroundColor = app.canvas.BGC;
	
	app.canvas.element.addEventListener("click", function(event) {
		app.canvas.handleEvent(event);
	}, false);
	
	app.canvas.handleEvent = function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		let a = this.element.getBoundingClientRect();
		let x = e.clientX - a.left;
		let y = e.clientY - a.top;
		
		switch(app.appUI.toolSelected) {
			case "moveTool":
				app.toolSet.moveTool.doTheJob(e.target, e.type, [x, y]);
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
	
})(window.app);