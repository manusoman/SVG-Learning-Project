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

        setColorNStroke : function() {

            let tmp = document.getElementById("fillColor");
            tmp.addEventListener("change", function() {
                app.appUI.fillColor = this.value;
                if(this.value === "none") {
                    app.appUI.fillOpacity = 0;
                } else {
                    app.appUI.fillOpacity = 1;
                }
            });

            tmp = document.getElementById("strokeColor");
            tmp.addEventListener("change", function() {
                app.appUI.strokeColor = this.value;
                if(this.value === "none") {
                    app.appUI.strokeOpacity = 0;
                } else {
                    app.appUI.strokeOpacity = 1;
                }
            });

            tmp = document.getElementById("strokeWidth");
            tmp.addEventListener("change", function() {
                app.appUI.strokeWidth = this.selectedIndex;
            });

        }
    };

})(window.app);

app.appUI.detectSelectedTool();
app.appUI.setColorNStroke();