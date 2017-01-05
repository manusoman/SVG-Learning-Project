(function(app) {
    
    "use strict";
    
    

    app.transformer = {
        
        main_Transform_Group : {},
        editGroup_Cover      : {},
        boundingRect_Cover   : {},
        boundingRect         : {},
        
        am_I_attached        : false,
        isFresh              : true,
        
        tMatrix              : app.canvas.element.createSVGMatrix(),
        currentTMatrix       : false,
        
        
        
        
        attachTransformer : function() {
            
            if(!this.am_I_attached) {
                
                this.tMatrix = app.canvas.generate_SVGMatrix();
                // This line resets the tMatrix.
                
                app.canvas.apply_Transformation_From_SVGMatrix({
                    matrix  : this.tMatrix,
                    element : this.main_Transform_Group
                });
                
                app.canvas.append_SVG_Element(this.main_Transform_Group);
                
                this.am_I_attached = true;
                this.isFresh = true;
            }
        },
        
        
        
        
        detachTransformer : function() {
            
            if(this.am_I_attached) {
                app.canvas.remove_SVG_Element(this.main_Transform_Group);
                this.am_I_attached = false;
            }
        },
        
        
        
        
        
        update_EditGroup : function(opt, editGroup, EGTMatrix) {
            // EGTMatrix => EditGroupTMatrix.
            
            if(opt === "add") {
                this.attachTransformer();
                
                let tmp = this.tMatrix.inverse();
                tmp = EGTMatrix.multiply(tmp);

                app.canvas.apply_Transformation_From_SVGMatrix({
                    matrix  : tmp,
                    element : editGroup
                });
                
                app.canvas.append_SVG_Element(editGroup, this.editGroup_Cover);
                
            } else if(opt === "remove") {
                
                app.canvas.remove_SVG_Element(editGroup, this.editGroup_Cover);
                
            } else {
                console.log("Custom Error: editGroup option is not understood!");
            }
            
            this.update_BoundingRect();
        },
        
        
        
        
        
        update_BoundingRect : function() {
            let tmpRect = this.editGroup_Cover.getBBox();
            
            this.boundingRect.setAttribute("x", tmpRect.x);
            this.boundingRect.setAttribute("y", tmpRect.y);
            this.boundingRect.setAttribute("width", tmpRect.width);
            this.boundingRect.setAttribute("height", tmpRect.height);
        },
        
        
        
        
        
        transform : function(matrix) {
            
            this.currentTMatrix = matrix;            
            let tmp = this.tMatrix.multiply(this.currentTMatrix);
            
            app.canvas.apply_Transformation_From_SVGMatrix({
                matrix  : tmp,
                element : this.main_Transform_Group
            });
            
            this.isFresh = false;
        },
        
        
        
        
        
        
        finishTransformation : function() {
            
            this.tMatrix = this.main_Transform_Group.getCTM();
            
            let i, objLst = app.canvas.selectedObjects,
                l = objLst.length;
            
            for(i = 0; i < l; i++) {
                objLst[i].transform(this.currentTMatrix);
            }
            
            this.update_BoundingRect();
        }
        
    };
    
    
    
    
    
    
    
    (function(o) {
            
        o.main_Transform_Group = app.canvas.generate_SVG_Element("g");
        o.main_Transform_Group.setAttribute("class", "transformer");
        
        o.editGroup_Cover = app.canvas.generate_SVG_Element("g");

        o.boundingRect_Cover = app.canvas.generate_SVG_Element("g");
        
        o.boundingRect = app.canvas.generate_SVG_Element("rect");
        o.boundingRect.setAttribute("fill", "transparent");
        o.boundingRect.setAttribute("class", "boundingRect");

        app.canvas.append_SVG_Element(o.boundingRect, o.boundingRect_Cover);
        app.canvas.append_SVG_Element(o.boundingRect_Cover, o.main_Transform_Group);
        app.canvas.append_SVG_Element(o.editGroup_Cover, o.main_Transform_Group);
        
        app.toolSet.transformer = o;
        
    })(app.transformer);
    

})(window.app);