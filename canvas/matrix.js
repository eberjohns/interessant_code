class Matrix{
    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;
        this.data = new Float32Array(rows*cols);//will be initialised with zeroes
    }

    randomise(){
        for(let i=0;i<this.data.length;i++)
            this.data[i] = Math.round(Math.random()*5 + 1);//Math.round(Math.random()*2 - 1);
    }

    transpose(){
        //write inplace transposing if needed
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

    add(n){
        if(n instanceof Matrix){
            //cardinality check
            if(this.rows !== n.rows || this.cols !== n.cols){
                console.log("Can't add as cardinality doesn't match!!");
                return null;
            }
            for(let i=0;i<this.data.length;i++)
                this.data[i] += n.data[i];
        }else{
            for(let i=0;i<this.data.length;i++)
                this.data[i] +=n;
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
            for(let i=0;i<a.data.length;i++)
                result.data[i] = a.data[i] + b.data[i];

            return result;
        }else{
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.data.length;i++)
                result.data[i] = a.data[i] + b;

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
            for(let i=0;i<this.data.length;i++)
                this.data[i] -= n.data[i];
        }else{
            for(let i=0;i<this.data.length;i++)
                this.data[i] -=n;
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
            for(let i=0;i<a.data.length;i++)
                result.data[i] = a.data[i] - b.data[i];

            return result;
        }else{
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.data.length;i++)
                result.data[i] = a.data[i] - b;

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
            let newData = new Float32Array(this.rows*n.cols);
            for(let i=0;i<this.rows;i++){
                for(let j=0;j<n.cols;j++){
                    let sum = 0;
                    for(let k=0;k<n.rows;k++){
                        sum += this.data[k*this.rows+i] * n.data[j*n.rows+k];
                    }
                    newData[j*this.rows+i] = sum;
                }
            }
            this.cols = n.cols;
            this.data = newData;
        }else{
            for(let i=0;i<this.data.length;i++)
                this.data[i] *=n;
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
                    for(let k=0;k<b.rows;k++){
                        sum += a.data[k*a.rows+i] * b.data[j*b.rows+k];
                    }
                    result.data[j*a.rows+i] = sum;
                }
            }
            return result;
        }else{
            let result = new Matrix(a.rows,a.cols);
            for(let i=0;i<a.data.length;i++)
                result.data[i] = a.data[i] * b;

            return result;
        }
    }

    map(func){
        for(let i=0;i<this.data.length;i++)
            this.data[i]  = func(this.data[i]);
    }

    static map(m, func) {
        let result = new Matrix(m.rows, m.cols);
        for(let i=0;i<m.data.length;i++)
            result.data[i] = func(m.data[i]);

        return result;
    }

    hadamard(n){
        if(this.rows !== n.rows || this.cols !== n.cols){
            console.log("Cardinality mismatch in hadamard product");
            return null;
        }
        for(let i=0;i<this.data.length;i++)
            this.data[i] *= n.data[i];
    }

    //testing helper function
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

let mat1 = new Matrix(3,2);
mat1.randomise();
console.log("mat1:");
mat1.print();

let mat2 = new Matrix(3,2);
mat2.randomise();
console.log("mat2:");
mat2.print();

let mat4 = Matrix.multiply(mat,mat1);
mat4.print();