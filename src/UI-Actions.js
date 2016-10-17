/* Configuring UI elements and their actions */

"use strict";

var appUI = {};

(function() {
	
	window.appUI = {
		toolSelected 	: "moveTool",
		fillColor 		: "#1c8bea",
		strokeColor 	: "#000",
		strokeWidth 	: 2,
		
		detectSelectedTool : function () {
			let tmp = document.getElementById("toolBox");
			let buttons = tmp.getElementsByTagName("button");
			let i, l = buttons.length;
			for(i = 0; i < l; i++) {
				buttons[i].addEventListener("click", function() {
					window.appUI.toolSelected = this.value;
				});
			}
		}
	};
	
})();

appUI.detectSelectedTool();