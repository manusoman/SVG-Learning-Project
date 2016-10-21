/* Configuring Layer Palette */

"use strict";

app.appUI.layerPalette = {
	layerIDCount	: 0,
	selectedLayers 	: false
};

(function(app, LPalette) {
	
	LPalette.selectionUpdate = function() {
		let tmp = document.getElementById("layerID"),
			s = "", i, l = app.canvas.selectedObjects.length;
		
		if(app.canvas.selectedObjects) {
			this.selectedLayers = [];
			for(i = 0; i < l; i++) {
				this.selectedLayers.push(app.canvas.selectedObjects[i].element);
				s += app.canvas.selectedObjects[i].element.id;
			}
			tmp.innerHTML = s;
		} else {
			this.selectedLayers = false;
			tmp.innerHTML = "No layers selected";
		}
	};
	
})(window.app, window.app.appUI.layerPalette);