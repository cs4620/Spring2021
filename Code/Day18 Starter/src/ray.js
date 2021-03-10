import Vector3 from "./vector-3.js"

class Ray{
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
    normalize(){
        this.end = Vector3.add(this.start, this.direction.scale(1/this.length))
        return this;
    }
    
    get direction(){
        return Vector3.minus(this.end, this.start);
    }
    get length(){
        return this.direction.length;
    }
    static direction(ray){
        return ray.direction;
    }
    static length(ray){
        return ray.length;
    }

}

export default Ray;