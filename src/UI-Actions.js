/* Configuring UI elements and their actions */

"use strict";

(function(app) {

    app.appUI = {
        toolSelected 	: "moveTool",
        fillColor 		: "#1c8bea",
        fillOpacity		: 1,
        strokeColor 	: "#000",
        strokeOpacity	: 1,
        strokeWidth 	: 1,

        detectSelectedTool : function() {
            let i, tmp = document.getElementById("toolBox"),
                buttons = tmp.getElementsByTagName("button"),
                l = buttons.length;

            for(i = 0; i < l; i++) {
                buttons[i].addEventListener("click", function() {
                    app.appUI.toolSelected = this.value;
                });
            }
        },
        
        
        // This function sets the UI Color, Stroke and Stroke Widths.
        setColorNStroke : function() {

            let tmp = document.getElementById("fillColor");
            tmp.addEventListener("change", function() {
                app.appUI.fillColor = this.value;
                if(this.value === "none") {
                    app.appUI.fillOpacity = 0;
                } else {
                    app.appUI.fillOpacity = 1;
                }
                
                app.appUI.passColorNStroke("fillColor");
            });

            tmp = document.getElementById("strokeColor");
            tmp.addEventListener("change", function() {
                app.appUI.strokeColor = this.value;
                if(this.value === "none") {
                    app.appUI.strokeOpacity = 0;
                } else {
                    app.appUI.strokeOpacity = 1;
                }
                app.appUI.passColorNStroke("strokeColor");
            });

            tmp = document.getElementById("strokeWidth");
            tmp.addEventListener("change", function() {
                app.appUI.strokeOpacity = 1;
                app.appUI.strokeWidth = this.selectedIndex;
                app.appUI.passColorNStroke("strokeWidth");
            });

        },
        
        // This function tells the selected PathObjects that the UI ColorNStroke 
        // has changed and passess the changed property to the PathObjects
        // so that they can udate that particular property of theirs.
        passColorNStroke : function(x) {
            let i, l;
            
            if(app.canvas.selectedObjects) {
                l = app.canvas.selectedObjects.length;                
                for(i = 0; i < l; i++) {
                    app.canvas.selectedObjects[i].applyColorNStroke(x);
                }                
            }
        }
    };

})(window.app);

app.appUI.detectSelectedTool();
app.appUI.setColorNStroke();