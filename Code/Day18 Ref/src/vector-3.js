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
    static get negativeX(){return  new Vector3(-1,0,0);}
    static get negativeY(){return  new Vector3(0,-1,0);}
    static get negativeZ(){return  new Vector3(0,0,-1);}

    constructor(x,y,z){
        this.v = [];
        this.v.push(x);
        this.v.push(y);
        this.v.push(z);
    }
    clone(){
        return new Vector3(this.x, this.y, this.z);
    }
    static clone(one){
        return new Vector3(one.x, one.y, one.z);
    }
    get x(){return this.v[x]}
    get y(){return this.v[y]}
    get z(){return this.v[z]}

    get r(){return this.v[r]}
    get g(){return this.v[g]}
    get b(){return this.v[b]}

    get length(){
        return Math.sqrt(this.v.reduce((a,i)=>a+i**2,0))
    }
    normalize(){
        let l = this.length;
        this.v = this.v.map(i=>i/l);
        return this;
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
        return vector3.clone().scale(scalar);
    }
    minus(other){
        this.v[x]-=other.x;
        this.v[y]-=other.y;
        this.v[z]-=other.z;
        return this;
    }
    static minus(one, two){
        let vector = one.clone().minus(two);
        return vector;
    }
    add(other){
        this.v[x]+=other.x;
        this.v[y]+=other.y;
        this.v[z]+=other.z;
        return this;
    }
    static add(one, two){
        let vector = one.clone().add(two);
        return vector;
    }
    dot(other){
        return this.x*other.x+this.y*other.y+this.z*other.z;
    }
    static dot(one, two){
        return one.x*two.x+one.y*two.y+one.z*two.z;
    }
    cross(other){
        let _x, _y, _z;
        _x = this.v[y]*other.v[z] - this.v[z]*other.v[y];
        _y = this.v[z]*other.v[x] - this.v[x]*other.v[z];
        _z = this.v[x]*other.v[y] - this.v[y]*other.v[x];
        this.v[x] = _x;
        this.v[y] = _y;
        this.v[z] = _z;
        return this;
    }
    static cross(one, two){
        let vector = one.clone().cross(two);
        return vector;

    }

}

export default Vector3;