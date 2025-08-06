class Matrix{
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.data = [];

        for(let i=0;i<this.row;i++){
            this.data[i] = [];
            for(let j=0;j<this.col;j++){
                //initialise with 0
                this.data[i][j] = 0;
            }
        }
    }

    randomise(){
        for(let i=0;i<this.row;i++){
            for(let j=0;j<this.col;j++){
                this.data[i][j] = Math.round(Math.random()*2 - 1);
            }
        }
    }

    transpose(){
        let newData = [];
        for(let i=0;i<this.col;i++){
            newData[i] = [];
            for(let j=0;j<this.row;j++){
                newData[i][j] = this.data[j][i];
            }
        }

        let temp = this.row;
        this.row = this.col;
        this.col = temp;

        this.data = newData;
    }

    static transpose(m){
        let result = new Matrix(m.col,m.row);
        for(let i=0;i<m.col;i++){
            for(let j=0;j<m.row;j++){
                result.data[i][j] = m.data[j][i];
            }
        }
        return result;
    }

    static fromArray(arr){
        let result = new Matrix(arr.length,1);

        for(let i=0;i<arr.length;i++){
            result.data[i] = [];
            result.data[i][0] = arr[i];
        }

        return result;
    }

    static toArray(mat){
        let result = [];

        for(let i=0;i<mat.row;i++){
            for(let j=0;j<mat.col;j++){
                result.push(mat.data[i][j]);
            }
        }

        return result;
    }

    add(n){
        if(n instanceof Matrix){
            //cardinality check
            if(this.row !== n.row || this.col !== n.col){
                console.log("Can't add as cardinality doesn't match!!");
                return null;
            }
            for(let i=0;i<this.row;i++){
                for(let j=0;j<this.col;j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        }else{
            for(let i=0;i<this.row;i++){
                for(let j=0;j<this.col;j++){
                    this.data[i][j] +=n;
                }
            }
        }
    }

    static add(a,b){
        if(a instanceof Matrix && b instanceof Matrix){
            //cardinality check
            if(a.row !== b.row || a.col !== b.col){
                console.log("Can't add as cardinality doesn't match!!");
                return null;
            }
            let result = new Matrix(a.row,a.col);
            for(let i=0;i<a.row;i++){
                for(let j=0;j<a.col;j++){
                    result.data[i][j] = a.data[i][j] + b.data[i][j];
                }
            }
            return result;
        }else{
            let result = new Matrix(a.row,a.col);
            for(let i=0;i<a.row;i++){
                for(let j=0;j<a.col;j++){
                    result.data[i][j] = a.data[i][j] + b;
                }
            }

            return result;
        }
    }

    multiply(n){
        if(n instanceof Matrix){
            //cardinality check
            if(this.col !== n.row){
                console.log("Can't multiply as cardinality doesn't match!!");
                return null;
            }
            let newData = [];
            for(let i=0;i<this.row;i++){
                newData[i] = [];
                for(let j=0;j<n.col;j++){
                    let sum = 0;
                    for(let k=0;k<this.col;k++){
                        sum += this.data[i][k] * n.data[k][j];
                    }
                    newData[i][j] = sum;
                }
            }
            this.col = n.col;
            this.data = newData;
        }else{
            for(let i=0;i<this.row;i++){
                for(let j=0;j<this.col;j++){
                    this.data[i][j] *=n;
                }
            }
        }
    }

    static multiply(a,b){
        if(a instanceof Matrix && b instanceof Matrix){
            //cardinality check
            if(a.col !== b.row){
                console.log("Can't multiply as cardinality doesn't match!!");
                return null;
            }

            let result = new Matrix(a.row,b.col);
            for(let i=0;i<a.row;i++){
                for(let j=0;j<b.col;j++){
                    let sum = 0;
                    for(let k=0;k<a.col;k++){
                        sum += a.data[i][k] * b.data[k][j];
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }else{
            let result = new Matrix(a.row,a.col);
            for(let i=0;i<a.row;i++){
                for(let j=0;j<a.col;j++){
                    result.data[i][j] = a.data[i][j] * b;
                }
            }
            return result;
        }
    }

    map(func){
        for(let i=0;i<this.row;i++){
            for(let j=0;j<this.col;j++){
                this.data[i][j]  = func(this.data[i][j], i, j);
            }
        }
    }

    static map(m, func) {
        let result = new Matrix(m.row, m.col);
        for(let i=0;i<m.row;i++){
            for(let j=0;j<m.col;j++){
                result.data[i][j] = func(m.data[i][j], i, j);
            }
        }
        return result;
    }

    hadamard(n){
        if(this.row !== n.row || this.col !== n.col){
            console.log("Cardinality mismatch in hadamard product");
            return null;
        }
        for(let i=0;i<this.row;i++){
            for(let j=0;j<this.col;j++){
                this.data[i][j] *= n.data[i][j];
            }
        }
    }

    print() {
        console.table(this.data);
    }
}

// let mat = new Matrix(1,2);
// mat.randomise();
// console.log("mat:");
// mat.print();

// let mat1 = new Matrix(2,3);
// mat1.randomise();
// console.log("mat1:");
// mat1.print();

// let mat2 = Matrix.multiply(mat,mat1);
// mat2.print();
