class Ray{
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
    normalize(){
        this.end = this.start.add((this.end.minus(this.start)).scale(1/this.end.minus(this.start).length))
    }

}

export default Ray;