class Matrix{
    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;
        this.data = new Float32Array(rows*cols);//will be initialised with zeroes
    }

    randomise(){
        for(let i=0;i<this.data.length;i++)
            this.data[i] = Math.round(Math.random()*20);//Math.round(Math.random()*2 - 1);
    }

    //to change!!!
    transpose(){
        let newData = [];
        for(let i=0;i<this.cols;i++){
            newData[i] = [];
            for(let j=0;j<this.rows;j++){
                newData[i][j] = this.data[j][i];
            }
        }

        let temp = this.rows;
        this.rows = this.cols;
        this.cols = temp;

        this.data = newData;
    }

    static transpose(mat){
        let result = new Matrix(mat.cols,mat.rows);
        for(let i=0;i<mat.rows;i++){
            for(let j=0;j<mat.cols;j++){
                //result storage moves linearly while mat data jumps memory space
                result.data[i*mat.cols+j] = mat.data[j*mat.rows+i];
            }
        }
        return result;
    }

    static fromArray(arr){
        let result = new Matrix(arr.length,1);

        for(let i=0;i<arr.length;i++)
            result.data[i] = arr[i];

        return result;
    }

    static toArray(mat){
        let result = [];

        for(let i=0;i<mat.data.length;i++)
            //pushed to array in column-major format as its stored so in memory
            result.push(mat.data[i]);

        return result;
    }

    //continue modifying from here
    add(n){
        if(n instanceof Matrix){
            //cardinality check
            if(this.rows !== n.rows || this.cols !== n.cols){
                console.log("Can't add as cardinality doesn't match!!");
                return null;
            }
            for(let i=0;i<this.rows;i++){
                for(let j=0;j<this.cols;j++){
                    this.data[i][j] += n.data[i][j];
                }
            }
        }else{
            for(let i=0;i<this.rows;i++){
                for(let j=0;j<this.cols;j++){
                    this.data[i][j] +=n;
                }
            }
        }
    }

    static add(a,b){
        if(a instanceof Matrix && b instanceof Matrix){
            //cardinality check
            if(a.rows !== b.rows || a.cols !== b.cols){
                console.log("Can't add as cardinality doesn't match!!");
                return null;
            }
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                    result.data[i][j] = a.data[i][j] + b.data[i][j];
                }
            }
            return result;
        }else{
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                    result.data[i][j] = a.data[i][j] + b;
                }
            }

            return result;
        }
    }

    subtract(n){
        if(n instanceof Matrix){
            //cardinality check
            if(this.rows !== n.rows || this.cols !== n.cols){
                console.log("Can't subtract as cardinality doesn't match!!");
                return null;
            }
            for(let i=0;i<this.rows;i++){
                for(let j=0;j<this.cols;j++){
                    this.data[i][j] -= n.data[i][j];
                }
            }
        }else{
            for(let i=0;i<this.rows;i++){
                for(let j=0;j<this.cols;j++){
                    this.data[i][j] -=n;
                }
            }
        }
    }

    static subtract(a,b){
        if(a instanceof Matrix && b instanceof Matrix){
            //cardinality check
            if(a.rows !== b.rows || a.cols !== b.cols){
                console.log("Can't subtract as cardinality doesn't match!!");
                return null;
            }
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                    result.data[i][j] = a.data[i][j] - b.data[i][j];
                }
            }
            return result;
        }else{
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                    result.data[i][j] = a.data[i][j] - b;
                }
            }

            return result;
        }
    }

    multiply(n){
        if(n instanceof Matrix){
            //cardinality check
            if(this.cols !== n.rows){
                console.log("Can't multiply as cardinality doesn't match!!");
                return null;
            }
            let newData = [];
            for(let i=0;i<this.rows;i++){
                newData[i] = [];
                for(let j=0;j<n.cols;j++){
                    let sum = 0;
                    for(let k=0;k<this.cols;k++){
                        sum += this.data[i][k] * n.data[k][j];
                    }
                    newData[i][j] = sum;
                }
            }
            this.cols = n.cols;
            this.data = newData;
        }else{
            for(let i=0;i<this.rows;i++){
                for(let j=0;j<this.cols;j++){
                    this.data[i][j] *=n;
                }
            }
        }
    }

    static multiply(a,b){
        if(a instanceof Matrix && b instanceof Matrix){
            //cardinality check
            if(a.cols !== b.rows){
                console.log("Can't multiply as cardinality doesn't match!!");
                return null;
            }

            let result = new Matrix(a.rows,b.cols);
            for(let i=0;i<a.rows;i++){
                for(let j=0;j<b.cols;j++){
                    let sum = 0;
                    for(let k=0;k<a.cols;k++){
                        sum += a.data[i][k] * b.data[k][j];
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        }else{
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.rows;i++){
                for(let j=0;j<a.cols;j++){
                    result.data[i][j] = a.data[i][j] * b;
                }
            }
            return result;
        }
    }

    map(func){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.data[i][j]  = func(this.data[i][j], i, j);
            }
        }
    }

    static map(m, func) {
        let result = new Matrix(m.rows, m.cols);
        for(let i=0;i<m.rows;i++){
            for(let j=0;j<m.cols;j++){
                result.data[i][j] = func(m.data[i][j], i, j);
            }
        }
        return result;
    }

    hadamard(n){
        if(this.rows !== n.rows || this.cols !== n.cols){
            console.log("Cardinality mismatch in hadamard product");
            return null;
        }
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.data[i][j] *= n.data[i][j];
            }
        }
    }

    print() {
        let p_data = [];

        for(let i = 0;i<this.rows;i++){
            p_data[i] = [];
            for(let j = 0;j<this.cols;j++){
                p_data[i][j] = this.data[j*this.rows+i];
            }
        }
        console.table(p_data);
    }
}

let mat = new Matrix(2,3);
mat.randomise();
console.log("mat:");
mat.print();

let mat1 = Matrix.transpose(mat)
console.log("mat1:");
mat1.print();

let arr = Matrix.toArray(mat1);
console.table(arr);

let array = [];

for(let i = 0;i<4;i++)
    array[i] = i+1;

let mat2 = Matrix.fromArray(array);
mat2.print();

// let mat2 = Matrix.multiply(mat,mat1);
// mat2.print();
