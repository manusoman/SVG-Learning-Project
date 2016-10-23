var ele = {
    element : document.getElementById("rect"),
    tMatrix : [],
    pivot : [],
    initCoord : [],
    
    setPivot : function(x, y) {
        this.tMatrix = this.element.getAttribute("transform").slice(7,-1).split(",");
        this.pivot = [parseFloat(this.tMatrix[4]), parseFloat(this.tMatrix[5])];
        this.initCoord = [x, y];
    },
    
    trnslt : function(x, y) {
        let a, b, str = "";

        a = this.pivot[0] + (x - this.initCoord[0]);
        b = this.pivot[1] + (y - this.initCoord[1]);
        //str = "matrix(1,0,0,1," + a + "," + b + ")";
        str = "matrix(" +
            this.tMatrix[0] + "," +
            this.tMatrix[1] + "," +
            this.tMatrix[2] + "," +
            this.tMatrix[3] + "," +
            a + "," + b +
            ")";
        this.element.setAttribute("transform", str);
    }
};