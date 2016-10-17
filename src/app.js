"use strict";

var canvas = {};
canvas.element = document.getElementById("Canvas");

(function() {
	
	canvas.element.setAttribute("width", canvasConfig.canvasWidth);
	canvas.element.setAttribute("height", canvasConfig.canvasHeight);
	canvas.element.style.backgroundColor = canvasConfig.canvasBGC;
	
	canvas.element.addEventListener("click", function(event) {
		window.canvas.handleEvent(event);
	}, false);
	
	canvas.handleEvent = function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		if(appUI.toolSelected === "polygonTool") {
			window.toolSet.polygonTool.draw(e.offsetX, e.offsetY);
		}
		
		else if(appUI.toolSelected === "lineTool") {
			window.toolSet.lineTool.draw(e.offsetX, e.offsetY);
		}
		
	}
	
})();