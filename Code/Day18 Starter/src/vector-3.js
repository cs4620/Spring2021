let x = 0;
let y = 1;
let z = 2;
let r = 0;
let g = 1;
let b = 2;


class Vector3{

    static get Zero(){ return new Vector3(0,0,0)};
    static get One(){ return new Vector3(1,1,1);}
    static get positiveX(){return  new Vector3(1,0,0);}
    static get positiveY(){return  new Vector3(0,1,0);}
    static get positiveZ(){return  new Vector3(0,0,1);}

    constructor(x,y,z){
        this.v = [];
        this.v.push(x);
        this.v.push(y);
        this.v.push(z);
    }
    get x(){return this.v[x]}
    get y(){return this.v[y]}
    get z(){return this.v[z]}
    get length(){
        return Math.sqrt(this.v.reduce((a,i)=>a+i**2,0))
    }
    normalize(){
        let l = this.length;
        this.v = this.v.map(i=>i/l);
    }
    static normalize(vector3){
        let l = vector3.length;
        vector3.v = vector3.v.map(i=>i/l);
        return vector3;
    }
    scale(scalar){
        this.v = this.v.map(i=>i*scalar)
        return this;
    }
    static scale(vector3, scalar){
        return new Vector3(vector3.x, vector3.y, vector3.z).scale(scalar);
    }
    minus(other){
        this.v[x]-=other.x;
        this.v[y]-=other.y;
        this.v[z]-=other.z;
    }
    static minus(one, two){
        let vector = new Vector3(one.x, one.y, one.z);
        vector.minus(two);
        return vector;
    }
    add(other){
        this.v[x]+=other.x;
        this.v[y]+=other.y;
        this.v[z]+=other.z;
    }
    static add(one, two){
        let vector = new Vector3(one.x, one.y, one.z);
        vector.add(two);
        return vector;
    }

}

export default Vector3;