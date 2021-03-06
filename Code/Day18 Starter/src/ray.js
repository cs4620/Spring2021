import Vector3 from "./vector-3.js"

class Ray{
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
    normalize(){
        
    }
    get direction(){
        return Vector3.minus(this.end, this.start);
    }
    static direction(ray){
        return ray.direction;
    }
    get length(){
        return this.direction.length;
    }
    static length(ray){
        return ray.length;
    }
    distanceToPlane(plane){
        
    }

}

export default Ray;