/* Defines different type of objects, their prototypes and inheritance */

"use strict";

app.pathObjects = {};



(function(app) {	
	
	// Path object constructor
	function PathObject() {
		this.element = {};
		this.startPoint = [];
	}
	
	PathObject.prototype = {
		constructor : PathObject,
		
		createPathObject : function() {
			this.element = document.createElementNS("http://www.w3.org/2000/svg", "path");
		},
		
		drawPathObject : function(x, y) {
		}
	};
	
})(window.app);