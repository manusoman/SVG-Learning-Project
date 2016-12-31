/* Defines different type of objects, their prototypes and inheritance */

(function(app) {
    
    "use strict";
    
    
    
    // Path object constructor
    app.PathObject = function(func, opt) {
        
        this.editGroup = {};
        this.pathEditline = {};
        
        this.isClosedPath = false;
        this.pathNodeArray = false;
        
        this.element = {};
        this.tMatrix = {};
        
        this.fillColor = "";
        this.fillOpacity = "";
        this.strokeColor = "";
        this.strokeOpacity = "";
        this.strokeWidth = "";
        
        this[func](opt);
        // This function eliminates the requirement of a conditional statement.
        // The 'opt' variable will be an svg element if 'func' is 'assign' and
        // it will be the 'type' if 'func' is 'create'.
    };


    // Defining the prototype of every objects 
    // created by the PathObject constructor.
    app.PathObject.prototype = {
        
        constructor : app.PathObject,
        
        bossElement : app.toolSet.bossElement,
        
        
        
        
        create : function(type) {
            
            this.element = app.canvas.generate_SVG_Element(type);
            
            if(type === "rect") {
                
                this.element.setAttribute("x", "");
                this.element.setAttribute("y", "");
                this.element.setAttribute("rx", "");
                this.element.setAttribute("ry", "");
                this.element.setAttribute("width", "");
                this.element.setAttribute("height", "");
                
            } else if(type === "ellipse") {
                
                this.element.setAttribute("cx", "");
                this.element.setAttribute("cy", "");
                this.element.setAttribute("rx", "");
                this.element.setAttribute("ry", "");
                
            } else if(type === "path") {
                
                this.element.setAttribute("d", "");
                
            } else {
                
                this.element = null;
                console.log("Custom Error: PathObject type is not mentioned or not understood!");
                
            }
            
            this.element.id = "Layer" + (++app.appUI.layerPalette.layerIDCount);
            
            this.initilize_TMatrix(this.element);
            
            this.copyColorNStroke("set", "fillColor");
            this.copyColorNStroke("set", "fillOpacity");
            this.copyColorNStroke("set", "strokeColor");
            this.copyColorNStroke("set", "strokeOpacity");
            this.copyColorNStroke("set", "strokeWidth");

            app.canvas.append_SVG_Element(this.element, false);
            
            this.create_Edit_Group();
        },
        
        
        
        
        create_Edit_Group : function() {
            
            this.editGroup = app.canvas.generate_SVG_Element("g");
            this.editGroup.setAttribute("class", "editGroup");
            this.passElementAttributes(this.element, this.editGroup, "transform");
            
            let type = this.identify_Path_Type();
            
            this.pathEditline = app.canvas.generate_SVG_Element(type);
            this.pathEditline.setAttribute("class", "pathEditLine");
            
            if(type === "rect") {
                
                this.passElementAttributes(this.element, this.pathEditline, "x");
                this.passElementAttributes(this.element, this.pathEditline, "y");
                this.passElementAttributes(this.element, this.pathEditline, "rx");
                this.passElementAttributes(this.element, this.pathEditline, "ry");
                this.passElementAttributes(this.element, this.pathEditline, "width");
                this.passElementAttributes(this.element, this.pathEditline, "height");
                
            } else if(type === "ellipse") {
                
                this.passElementAttributes(this.element, this.pathEditline, "cx");
                this.passElementAttributes(this.element, this.pathEditline, "cy");
                this.passElementAttributes(this.element, this.pathEditline, "rx");
                this.passElementAttributes(this.element, this.pathEditline, "ry");
                
            } else if(type === "path") {
                
                this.passElementAttributes(this.element, this.pathEditline, "d");
                
            } else {
                
                this.pathEditline = null;
                console.log("Custom Error: PathEditLine type is not mentioned or not understood!");
                
            }
            
            app.canvas.append_SVG_Element(this.pathEditline, this.editGroup);
            app.toolSet.update_BossElements_Group(this.editGroup);
            
            this.tMatrix = this.editGroup.getCTM();
        },
        
        
        
        
        remove_Edit_Group : function() {
            this.editGroup.parentElement.removeChild(this.editGroup);
            app.toolSet.update_BossElements_Group();
        },
        
        
        
        
        assign : function(ele) {
            this.element = ele;            
            this.create_Edit_Group();
            
            if(app.appUI.toolSelected === "editTool") {
                if(this.identify_Path_Type() === "path") {
                    this.generatePoints(ele.getAttribute("d"));
                }
            }
            
            this.copyColorNStroke("get");
        },
        
        
        
        
        drawRectangle : function(type, rectData) {
            
            if(type === "startPoint") { 
                
                this.pathEditline.setAttribute("x", rectData[0]);
                this.pathEditline.setAttribute("y", rectData[1]);
                
            } else if(type === "modify") {
                
                this.pathEditline.setAttribute("x", rectData[0]);
                this.pathEditline.setAttribute("y", rectData[1]);
                this.pathEditline.setAttribute("width", rectData[2]);
                this.pathEditline.setAttribute("height", rectData[3]);
                
            } else {
                console.log("Custom Error: Mouse event type is not understood!");
            }
            
            this.passElementAttributes(this.pathEditline, this.element, "x");
            this.passElementAttributes(this.pathEditline, this.element, "y");
            //this.passElementAttributes(this.pathEditline, this.element, "rx");
            //this.passElementAttributes(this.pathEditline, this.element, "ry");
            this.passElementAttributes(this.pathEditline, this.element, "width");
            this.passElementAttributes(this.pathEditline, this.element, "height");
        },
        
        
        
        
        drawEllipse : function(type, elpsData) {
            
            if(type === "center") { 
                
                this.pathEditline.setAttribute("cx", elpsData[0]);
                this.pathEditline.setAttribute("cy", elpsData[1]);
                
            } else if(type === "modify") {
                
                this.pathEditline.setAttribute("cx", elpsData[0]);
                this.pathEditline.setAttribute("cy", elpsData[1]);
                this.pathEditline.setAttribute("rx", elpsData[2]);
                this.pathEditline.setAttribute("ry", elpsData[3]);
                
            } else {
                console.log("Custom Error: Mouse event type is not understood!");
            }
            
            this.passElementAttributes(this.pathEditline, this.element, "cx");
            this.passElementAttributes(this.pathEditline, this.element, "cy");
            this.passElementAttributes(this.pathEditline, this.element, "rx");
            this.passElementAttributes(this.pathEditline, this.element, "ry");
        },
        
        
        
        
        drawPath : function(type, vData) {
            let tmp;
            
            if(type === "create") {

                if(this.checkPathCompletion(vData[1])) {

                    this.isClosedPath = true;

                //***********************************************************
                // The tmp variable is required to assign vData
                // because, vData of the vertex object is a setter function.
                    let tmp = this.pathNodeArray[0].vData;
                    tmp[0] = vData[0];
                    this.pathNodeArray[0].vData = tmp;
                //***********************************************************

                } else {

                    if(!this.pathNodeArray) {                
                        this.pathNodeArray = [];
                    }

                    tmp = new app.Vertex(this.editGroup);
                    tmp.vData = vData;
                    this.pathNodeArray.push(tmp);
                }
                
            } else if(type === "manip") {
                
                if(this.isClosedPath) {
                    
                //***********************************************************
                // The tmp variable is required to assign vData
                // because, vData of the vertex object is a setter function.
                    let tmp = this.pathNodeArray[0].vData;
                    tmp[0] = vData[0];
                    this.pathNodeArray[0].vData = tmp;
                //***********************************************************
                    
                } else {                
                    let l = this.pathNodeArray.length;
                    this.pathNodeArray[l - 1].vData = vData;
                }
                
            } else {
                console.log("Custom Error: Mouse event type is not understood!");
            }
            
            this.pathEditline.setAttribute("d", this.generatePathData());
            this.passElementAttributes(this.pathEditline, this.element, "d");
        },
        
        
        
        
        checkPathCompletion : function(EVdata) {
            
            if(this.pathNodeArray) {
                
                let tmp = app.toolSet.vertexClickTolerance,
                    IVdata = this.pathNodeArray[0].vData[1],
                    x1 = IVdata[0], y1 = IVdata[1],
                    x2 = EVdata[0], y2 = EVdata[1];

                if((x1 >= x2 - tmp && x1 <= x2 + tmp) &&
                   (y1 >= y2 - tmp && y1 <= y2 + tmp)) {

                    return [IVdata];

                }
            }
            
            return false;
        },
        
        
        
        
        identify_Path_Type : function() {
            return this.element.tagName.toLowerCase();
        },
        
        
        
        
        initilize_TMatrix : function(ele) {
            let tmp = app.canvas.element.createSVGMatrix();
            tmp = app.canvas.element.createSVGTransformFromMatrix(tmp);
            ele.transform.baseVal.initialize(tmp);
        },
        
        
        
        
        update_Element_Transformation : function() {
            this.tMatrix = this.editGroup.getCTM();
            let tmp = app.canvas.element.createSVGTransformFromMatrix(this.tMatrix);
            this.element.transform.baseVal.initialize(tmp);
        },
        
        
        
        
        translate : function(dVector) {
            // dVector => Displacement Vector.
            
            let tmp = this.tMatrix.translate(dVector[0], dVector[1]);
            
            tmp = app.canvas.element.createSVGTransformFromMatrix(tmp);
            this.editGroup.transform.baseVal.initialize(tmp);
        },
        
        
        
        
        copyColorNStroke : function(opt, attr) {
            
            if(opt === "set") {
                switch(attr) {
                    case "fillColor":
                        this.element.setAttribute("fill", app.appUI.fillColor);
                        this.element.setAttribute("fill-opacity", app.appUI.fillOpacity);
                        this.fillColor = app.appUI.fillColor;
                        this.fillOpacity = app.appUI.fillOpacity;
                        break;
                    case "strokeColor":
                        this.element.setAttribute("stroke", app.appUI.strokeColor);
                        this.element.setAttribute("stroke-opacity", app.appUI.strokeOpacity);
                        this.strokeColor = app.appUI.strokeColor;
                        this.strokeOpacity = app.appUI.strokeOpacity;
                        break;
                    case "strokeWidth":
                        this.element.setAttribute("stroke-opacity", app.appUI.strokeOpacity);
                        this.element.setAttribute("stroke-width", app.appUI.strokeWidth);
                        this.strokeWidth = app.appUI.strokeWidth;
                        this.strokeOpacity = app.appUI.strokeOpacity;
                        break;
                }
                
            } else if(opt === "get") {
                this.fillColor = this.element.getAttribute("fill");
                this.fillOpacity = this.element.getAttribute("fill-opacity");
                this.strokeColor = this.element.getAttribute("stroke");
                this.strokeOpacity = this.element.getAttribute("stroke-opacity");
                this.strokeWidth = this.element.getAttribute("stroke-width");
                
            } else {
                console.log("Custom-error : Choose an option (set or get)!");
            }
        },
        
        
        
        
        passElementAttributes : function(source, destn, attr) {
            let tmp = source.getAttribute(attr);
            destn.setAttribute(attr, tmp);
        }
        
        
    };

})(window.app);