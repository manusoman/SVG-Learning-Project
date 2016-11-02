/* pathEditor object is the child of the PathObject, which creates
and manipulates the editor lines over any pathObject inside the svg. */

"use strict";

(function(app){
    
    app.PathObject.prototype.pathEditor = {
        
        _parentObject : false,
        
        editLine : '',
        editLinestrokeColor : "#00F",
        editLinestrokeWidth : 1,
        
        markerElementID : "#markerCircle",
        
        
        // This is a 'setter' function used to get the parent element.
        set parentObject(obj) {
            this._parentObject = obj;
        },
        
        createEditLine : function() {
            let tmp = this._parentObject.element.getAttribute("d"),
                mID = "url(" + this.markerElementID + ")";
            
            this.editLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.editLine.setAttribute("d", tmp);
            this.editLine.setAttribute("fill", "transparent");
            this.editLine.setAttribute("stroke", this.editLinestrokeColor);
            this.editLine.setAttribute("stroke-width", this.editLinestrokeWidth);
            
            this.editLine.setAttribute("marker-start", mID);
            this.editLine.setAttribute("marker-mid", mID);
            this.editLine.setAttribute("marker-end", mID);
            
            app.canvas.element.appendChild(this.editLine);
        }
        
    };
    
})(window.app);