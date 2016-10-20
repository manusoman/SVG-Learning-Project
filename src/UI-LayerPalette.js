/* Configuring Layer Palette */

"use strict";

app.appUI.layerPalette = {
	layerIDCount	: 0,
	selectedLayers 	: false
};

(function(LPalette) {
	
	LPalette.selectionUpdate = function(a) {
		let tmp = document.getElementById("layerID");
		
		if(a) {
			let i, l = a.length, s = "";
			for(i = 0; i < l; i++) {
				s += a[i].id;
			}
			tmp.innerHTML = s;
		} else {
			tmp.innerHTML = "No layers selected";
		}
		
		this.selectedLayers = a;
	};
	
})(window.app.appUI.layerPalette);