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
        return -(plane.A*this.start.x + plane.B * this.start.y + plane.C * this.start.z)/(plane.A*this.direction.x + plane.B*this.direction.y + plane.C*this.direction.z)
    }

}

export default Ray;