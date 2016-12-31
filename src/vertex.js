
(function(app) {
    
    "use strict";
    
    
    
    app.Vertex = function(parent) {
        this.parent = parent;
        
        this._vData = [];
        this.vRect  = {};
        
        this.LCP_Circle = false;
        this.LCP_Tangent = false;
        
        this.RCP_Circle = false;
        this.RCP_Tangent = false;
        
        this.createVertex();
    };
    
    
    app.Vertex.prototype = {
        
        constructor : app.Vertex,
        vRectDimension : 5,
        
        
        
        set vData(vData) {
            this._vData = vData;
            this.updateVertex();
        },
        
        
        
        get vData() {
            return this._vData;
        },
        
        
        
        createVertex : function() {
            this.vRect = app.canvas.generate_SVG_Element("rect");
            this.vRect.setAttribute("width", this.vRectDimension);
            this.vRect.setAttribute("height", this.vRectDimension);
            this.vRect.setAttribute("class", "vertex");
            
            this.LCP_Circle = app.canvas.generate_SVG_Element("circle");
            this.LCP_Circle.setAttribute("r", this.vRectDimension / 2);
            this.LCP_Circle.setAttribute("class", "controlPoint false");
            
            this.LCP_Tangent = app.canvas.generate_SVG_Element("line");
            this.LCP_Tangent.setAttribute("class", "CPTangent false");
            
            this.RCP_Circle = app.canvas.generate_SVG_Element("circle");
            this.RCP_Circle.setAttribute("r", this.vRectDimension / 2);
            this.RCP_Circle.setAttribute("class", "controlPoint false");
            
            this.RCP_Tangent = app.canvas.generate_SVG_Element("line");
            this.RCP_Tangent.setAttribute("class", "CPTangent false");
            
            app.canvas.append_SVG_Element(this.LCP_Circle, this.parent);
            app.canvas.append_SVG_Element(this.LCP_Tangent, this.parent);
            app.canvas.append_SVG_Element(this.RCP_Circle, this.parent);
            app.canvas.append_SVG_Element(this.RCP_Tangent, this.parent);
            app.canvas.append_SVG_Element(this.vRect, this.parent);           
        },
        
        
        
        updateVertex : function() {
            let LCP   = this._vData[0],
                vData = this._vData[1],
                RCP   = this._vData[2];
            
            this.vRect.setAttribute("x", vData[0] - (this.vRectDimension / 2));
            this.vRect.setAttribute("y", vData[1] - (this.vRectDimension / 2));
            
            if(LCP) {
                this.LCP_Circle.setAttribute("cx", LCP[0]);
                this.LCP_Circle.setAttribute("cy", LCP[1]);
                this.LCP_Circle.setAttribute("class", "controlPoint");
                
                this.LCP_Tangent.setAttribute("x1", vData[0]);
                this.LCP_Tangent.setAttribute("y1", vData[1]);
                this.LCP_Tangent.setAttribute("x2", LCP[0]);
                this.LCP_Tangent.setAttribute("y2", LCP[1]);
                this.LCP_Tangent.setAttribute("class", "CPTangent");
            }
            
            if(RCP) {
                this.RCP_Circle.setAttribute("cx", RCP[0]);
                this.RCP_Circle.setAttribute("cy", RCP[1]);
                this.RCP_Circle.setAttribute("class", "controlPoint");
                
                this.RCP_Tangent.setAttribute("x1", vData[0]);
                this.RCP_Tangent.setAttribute("y1", vData[1]);
                this.RCP_Tangent.setAttribute("x2", RCP[0]);
                this.RCP_Tangent.setAttribute("y2", RCP[1]);
                this.RCP_Tangent.setAttribute("class", "CPTangent");
            }
        }
        
        
    };
    
})(window.app);